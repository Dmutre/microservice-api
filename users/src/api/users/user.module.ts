import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { MAIL_SERVICE } from 'src/utils/consts/services.consts';
import MailConfig from 'src/config/mail.config';
import ConfigurationModule from 'src/config/configuration.module';
import { User } from 'src/database/entities/user.entity';
import { Token } from 'src/database/entities/token.entity';
import { Role } from 'src/database/entities/role.entity';
import { Permission } from 'src/database/entities/permission.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Token, Role, Permission]),
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
