import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class MailConfig {
  constructor(private readonly configService: ConfigService) {}

  get host() {
    return this.configService.get<string>('mail.host');
  }

  get password() {
    return this.configService.get<string>('mail.password');
  }

  get username() {
    return this.configService.get<string>('mail.username');
  }
}
