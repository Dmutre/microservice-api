import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import UserService from 'src/users/user.service';
import { User } from 'src/utils/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Provide token is invalid');
    }
    const user: User = await lastValueFrom(
      await this.authService.getCurrentUser(token),
    );
    if (!user) {
      throw new UnauthorizedException('Token is not valid');
    }
    request.user = user;
    return true;
  }
}
