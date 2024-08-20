import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserMessagePattern } from 'src/utils/consts/services-message-pattern.consts';
import { USER_SERVICE } from 'src/utils/consts/services.consts';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EmailDTO } from './dto/email.dto';
import { LoginDTO } from './dto/login.dto';
import { Request } from 'express';
import { TokenDTO } from './dto/token.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export default class UserService {
  private readonly logger = new Logger('UserService');

  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  async registerUser(data: RegisterUserDTO) {
    return this.userClient.send(UserMessagePattern.REGISTER_NEW_USER, data);
  }

  async requestEmailVerification(data: EmailDTO) {
    return this.userClient.send(
      UserMessagePattern.REQUEST_EMAIL_VERIFICATION,
      data,
    );
  }

  async verifyUserEmail(data: TokenDTO) {
    return this.userClient.send(UserMessagePattern.VERIFY_USER_EMAIL, data);
  }

  async loginUser(data: LoginDTO) {
    return this.userClient.send(UserMessagePattern.LOGIN_USER, data);
  }

  async refreshToken(token: string) {
    return this.userClient.send(UserMessagePattern.REFRESH_TOKEN, { token });
  }

  extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  getCurrentUser(token: string) {
    return this.userClient.send(UserMessagePattern.GET_CURRENT_USER, { token });
  }

  async checkUserPermission(
    userId: string,
    permissions: string[],
  ): Promise<boolean> {
    const response = await lastValueFrom(
      this.userClient.send(UserMessagePattern.CHECK_DOES_USER_HAVE_PERMISSION, {
        userId,
        permissions,
      }),
    );
    return response.isAllowed;
  }
}
