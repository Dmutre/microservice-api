import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MAIL_SERVICE } from '../../utils/consts/services.consts';
import { RegisterUserDTO } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailState, User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { MicroserviceException } from '../../utils/exceptions/microservice.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../utils/interfaces/jwt.payload';
import { Tokens } from '../../utils/interfaces/tokens';
import JwtConfig from '../../config/jwt.config';
import { Token, TokenType } from '../../database/entities/token.entity';
import { MINUTE, WEEK } from '../../utils/consts/global';
import { v4 } from 'uuid';
import { TokenDTO } from './dto/email-token.dto';
import { LoginDTO } from './dto/login.dto';
import { rolesList } from '../../database/seeds/data/roles.consts';
import { Role } from '../../database/entities/role.entity';
import { UserPermissionCheckDTO } from './dto/user-permission-check.dto';

@Injectable()
export default class UserService {
  constructor(
    @Inject(MAIL_SERVICE) private readonly mailClient: ClientProxy,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JwtConfig,
  ) {}

  async register(data: RegisterUserDTO) {
    const userExist = await this.checkIfUserExist(data.email);
    if (userExist)
      throw new MicroserviceException(
        'User already exist',
        HttpStatus.BAD_REQUEST,
      );

    data.password = await this.hashPassword(data.password);

    const adminRole = await this.roleRepo.findOne({
      where: { name: rolesList.ADMIN },
    });
    const newUser = await this.userRepo.create({
      ...data,
      roles: [adminRole],
    });

    await this.userRepo.save(newUser);
    return { message: 'User successfuly registrated' };
  }

  private generateTokens(user: User): Tokens {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.jwtConfig.refreshTtl,
      }),
    };
  }

  private async checkIfUserExist(email: string): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ email });
    return !!user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async requestEmailVerification(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user)
      throw new MicroserviceException(
        'User with such email doesn`t exist',
        HttpStatus.BAD_REQUEST,
      );

    if (user.emailState === 'APPROVED')
      throw new MicroserviceException(
        'User email already verified',
        HttpStatus.BAD_REQUEST,
      );

    await this.checkRequestsFrequency(
      email,
      TokenType.EMAIL_VERIFICATION_TOKEN,
    );

    const token = this.tokenRepo.create({
      user,
      value: v4(),
      type: TokenType.EMAIL_VERIFICATION_TOKEN,
    });
    await this.tokenRepo.save(token);

    await this.sendEmailVerification(email, token.value);
  }

  private async sendEmailVerification(to: string, token: string) {
    await this.mailClient.emit('email_verification', { email: to, token });
  }

  private async checkRequestsFrequency(email: string, type: TokenType) {
    const dbToken = await this.tokenRepo.findOne({
      where: {
        type,
        user: {
          email,
        },
      },
      order: {
        createdAt: 'desc',
      },
    });

    if (dbToken && Date.now() - dbToken.createdAt.getTime() < MINUTE) {
      throw new MicroserviceException(
        'Too many requests',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyUserEmail({ token }: TokenDTO) {
    const dbToken = await this.tokenRepo.findOne({
      where: { value: token },
      relations: ['user'],
    });
    if (!dbToken)
      throw new MicroserviceException('Invalid token', HttpStatus.BAD_REQUEST);

    this.checkTokenExpiration(dbToken);

    const user = await this.userRepo.findOneBy({ id: dbToken.user.id });
    if (!user)
      throw new MicroserviceException('User not found', HttpStatus.NOT_FOUND);

    user.emailState = EmailState.APPROVED;
    await this.userRepo.save(user);

    await this.tokenRepo.delete({ id: dbToken.id });
    return await this.generateTokens(user);
  }

  private checkTokenExpiration(token: Token) {
    if (Date.now() - token.createdAt.getTime() > WEEK)
      throw new MicroserviceException(
        'Token expired, repeat email verify request',
        HttpStatus.BAD_REQUEST,
      );
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user)
      throw new MicroserviceException('Incorrect email', HttpStatus.NOT_FOUND);

    await this.checkUserCredentials(user, password);
    return await this.generateTokens(user);
  }

  private async checkUserCredentials(user: User, password: string) {
    const notFoundException = new MicroserviceException(
      'User with such credentials was not found',
      HttpStatus.NOT_FOUND,
    );

    if (!user) throw notFoundException;
    if (user.emailState !== 'APPROVED')
      throw new MicroserviceException(
        'Account not verified',
        HttpStatus.FORBIDDEN,
      );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw notFoundException;
  }

  async validateUserToken(token: string) {
    if (!token) throw new UnauthorizedException();

    const payload = await this.verifyToken(token);
    const user = await this.userRepo.findOne({
      where: { id: payload.sub },
      relations: ['roles'],
    });
    delete user.password;
    return user;
  }

  private async verifyToken(token: string): Promise<JwtPayload> {
    const payload: JwtPayload = await this.jwtService
      .verifyAsync(token, { secret: this.jwtConfig.secret })
      .catch(() => {
        throw new UnauthorizedException();
      });
    return payload;
  }

  async refresh(token: string): Promise<Tokens> {
    const payload = await this.verifyToken(token);
    const user = await this.userRepo.findOne({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException();

    return await this.generateTokens(user);
  }

  async checkUserPermission(data: UserPermissionCheckDTO) {
    const user = await this.userRepo.findOne({
      where: { id: data.userId },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) throw new NotFoundException('User not found');

    const userPermissions = new Set<string>();
    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        userPermissions.add(permission.name);
      });
    });

    const havePermission: boolean = data.permissions.every((perm) =>
      userPermissions.has(perm),
    );
    return { isAllowed: havePermission };
  }
}
