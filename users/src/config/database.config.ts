import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  get db_port(): number {
    return this.configService.get<number>('db.port');
  }

  get db_host(): string {
    return this.configService.get<string>('db.host');
  }

  get db_user(): string {
    return this.configService.get<string>('db.user');
  }

  get db_password(): string {
    return this.configService.get<string>('db.password');
  }

  get db_name(): string {
    return this.configService.get<string>('db.name');
  }
}
