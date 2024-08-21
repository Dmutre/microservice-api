import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MailConfig from './mail.config';
import ConfigurationService from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
    }),
  ],
  providers: [MailConfig, ConfigurationService],
  exports: [MailConfig, ConfigurationService],
})
export default class ConfigurationModule {}
