import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class MailConfig {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }

  get password(): string {
    return this.configService.get<string>('mail.password');
  }

  get username(): string {
    return this.configService.get<string>('mail.username');
  }

  get frontendUrl(): string {
    return this.configService.get<string>('mail.frontendUrl');
  }
}
