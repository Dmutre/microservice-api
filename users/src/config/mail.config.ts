import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class MailConfig {
  constructor(private readonly configService: ConfigService) {}

  get mailConfig() {
    return this.configService.get('mailService');
  }
}
