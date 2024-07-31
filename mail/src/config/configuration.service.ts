import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions } from '@nestjs/microservices';

@Injectable()
export default class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get serviceOptions(): ClientOptions {
    return this.configService.get<ClientOptions>('serviceOptions');
  }
}
