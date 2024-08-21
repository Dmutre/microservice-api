import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import DatabaseConfig from './database.config';
import ConfigurationService from './config.service';
import MailConfig from './mail.config';
import JwtConfig from './jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
      load: [config],
    }),
  ],
  providers: [DatabaseConfig, ConfigurationService, MailConfig, JwtConfig],
  exports: [DatabaseConfig, ConfigurationService, MailConfig, JwtConfig],
})
export default class ConfigurationModule {}
