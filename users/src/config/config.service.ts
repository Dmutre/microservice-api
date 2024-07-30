import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('port');
  }

  get host(): string {
    return this.configService.get<string>('host');
  }
}
