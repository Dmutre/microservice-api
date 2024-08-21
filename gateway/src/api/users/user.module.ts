import { Module } from '@nestjs/common';
import UserService from './user.service';
import UserController from './user.controller';
import { USER_SERVICE } from '../../utils/consts/services.consts';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientOptions, ClientProxyFactory } from '@nestjs/microservices';

@Module({
  providers: [
    UserService,
    {
      provide: USER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const userServiceOptions =
          configService.get<ClientOptions>('userServiceConfig');
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
  controllers: [UserController],
  imports: [ConfigModule],
  exports: [UserService],
})
export default class UserModule {}
