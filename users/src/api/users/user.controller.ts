import { Controller } from '@nestjs/common';
import UserService from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EmailDTO } from './dto/email.dto';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'register_new_user' })
  register(data: RegisterUserDTO) {
    return this.userService.register(data);
  }

  @MessagePattern({ cmd: 'request_email_verification' })
  async requestEmailVerification({ email }: EmailDTO) {
    await this.userService.requestEmailVerification(email);
    return { message: 'Verification email was sent' };
  }
}
