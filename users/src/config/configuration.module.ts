import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import DatabaseConfig from './database.config';
import ConfigurationService from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [DatabaseConfig, ConfigurationService],
  exports: [DatabaseConfig, ConfigurationService],
})
export default class ConfigurationModule {}
