import { Module } from '@nestjs/common';
import ConfigurationModule from '../config/configuration.module';
import MailConfig from '../config/mail.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import MailController from './mail.controller';
import MailService from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [MailConfig],
      useFactory: (configService: MailConfig) => ({
        transport: {
          host: configService.host,
          secure: false,
          auth: {
            user: configService.username,
            pass: configService.password,
          },
        },
        defaults: {
          from: 'Approve your email <noreply@spdload-task.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ConfigurationModule,
  ],
  controllers: [MailController],
  providers: [MailService],
})
export default class MailModule {}
