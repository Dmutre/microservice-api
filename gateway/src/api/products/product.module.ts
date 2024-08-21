import { Module } from '@nestjs/common';
import ProductService from './product.service';
import ProductController from './product.controller';
import { PRODUCT_SERVICE } from '../../utils/consts/services.consts';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientOptions, ClientProxyFactory } from '@nestjs/microservices';
import UserModule from '../users/user.module';

@Module({
  providers: [
    ProductService,
    {
      provide: PRODUCT_SERVICE,
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get<ClientOptions>(
          'productServiceConfig',
        );
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
  controllers: [ProductController],
  imports: [ConfigModule, UserModule],
})
export default class ProductModule {}
