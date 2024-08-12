import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class JwtConfig {
  constructor(private readonly configService: ConfigService) {}

  get accessTtl(): string {
    return this.configService.get<string>('jwt.accessTttl');
  }

  get refreshTtl(): string {
    return this.configService.get<string>('jwt.refreshTtl');
  }

  get secret(): string {
    return this.configService.get<string>('jwt.secret');
  }
}
