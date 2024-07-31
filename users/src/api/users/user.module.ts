import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MAIL_SERVICE } from 'src/utils/consts/services.consts';
import MailConfig from 'src/config/mail.config';
import ConfigurationModule from 'src/config/configuration.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([]),
    ClientsModule.registerAsync([
      {
        name: MAIL_SERVICE,
        inject: [MailConfig],
        imports: [ConfigurationModule],
        useFactory: (configService: MailConfig) => configService.mailConfig,
      },
    ]),
    ConfigurationModule,
  ],
})
export default class UserModule {}
