import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MAIL_SERVICE } from 'src/utils/consts/services.consts';
import { RegisterUserDTO } from './dto/register-user.dto';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { MicroserviceException } from 'src/utils/exceptions/microservice.exception';

@Injectable()
export default class UserService {
  constructor(
    @Inject(MAIL_SERVICE) private readonly mailClient: ClientProxy,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async register(data: RegisterUserDTO) {
    const userExist = await this.checkIfUserExist(data.email);
    if (userExist) throw new MicroserviceException('User already exist', 400);

    throw new MicroserviceException('User already exist', 403);
    return 'lalalla';
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
}
