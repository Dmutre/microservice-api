import { Controller } from '@nestjs/common';
import UserService from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EmailDTO } from './dto/email.dto';
import { TokenDTO } from './dto/email-token.dto';
import { Tokens } from 'src/utils/interfaces/tokens';
import { LoginDTO } from './dto/login.dto';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'register_new_user' })
  register(data: RegisterUserDTO): Promise<{ message: string }> {
    return this.userService.register(data);
  }

  @MessagePattern({ cmd: 'request_email_verification' })
  async requestEmailVerification({
    email,
  }: EmailDTO): Promise<{ message: string }> {
    await this.userService.requestEmailVerification(email);
    return { message: 'Verification email was sent' };
  }

  @MessagePattern({ cmd: 'verify_user_email' })
  async verifyUserEmail(data: TokenDTO): Promise<Tokens> {
    return this.userService.verifyUserEmail(data);
  }

  @MessagePattern({ cmd: 'user_login' })
  async login(data: LoginDTO) {
    return this.userService.login(data);
  }

  @MessagePattern({ cmd: 'refresh_token' })
  async refreshToken({ token }: TokenDTO) {
    return this.userService.refresh(token);
  }

  @MessagePattern({ cmd: 'get_current_user' })
  async getCurrentUser({ token }: TokenDTO) {
    return this.userService.validateUserToken(token);
  }
}
