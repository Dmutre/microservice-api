import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MAIL_SERVICE } from '../../utils/consts/services.consts';
import { RegisterUserDTO } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { MicroserviceException } from '../../utils/exceptions/microservice.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../utils/interfaces/jwt.payload';
import { Tokens } from '../../utils/interfaces/tokens';
import JwtConfig from '../../config/jwt.config';
import { Token, TokenType } from '../../database/entities/token.entity';
import { MINUTE } from '../../utils/consts/global';
import { v4 } from 'uuid';

@Injectable()
export default class UserService {
  constructor(
    @Inject(MAIL_SERVICE) private readonly mailClient: ClientProxy,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
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

    await this.userRepo.save(data);
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
}
