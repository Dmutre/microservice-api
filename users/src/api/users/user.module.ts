import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { MAIL_SERVICE } from '../../utils/consts/services.consts';
import MailConfig from '../../config/mail.config';
import ConfigurationModule from '../../config/configuration.module';
import { User } from '../../database/entities/user.entity';
import { Token } from '../../database/entities/token.entity';
import { Role } from '../../database/entities/role.entity';
import { Permission } from '../../database/entities/permission.entity';
import { JwtModule } from '@nestjs/jwt';
import JwtConfig from '../../config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [JwtConfig],
      useFactory: (configService: JwtConfig) => ({
        global: true,
        secret: configService.secret,
        signOptions: {
          expiresIn: configService.accessTtl,
        },
      }),
    }),
  ],
})
export default class UserModule {}
