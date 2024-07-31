import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import MailModule from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    MailModule,
  ],
})
export class AppModule {}
