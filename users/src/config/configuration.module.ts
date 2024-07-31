import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import DatabaseConfig from './database.config';
import ConfigurationService from './config.service';
import MailConfig from './mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [DatabaseConfig, ConfigurationService, MailConfig],
  exports: [DatabaseConfig, ConfigurationService, MailConfig],
})
export default class ConfigurationModule {}
