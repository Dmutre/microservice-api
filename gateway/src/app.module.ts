import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import UserModule from './api/users/user.module';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import ProductModule from './api/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    UserModule,
    ProductModule,
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
