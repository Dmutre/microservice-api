import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config.ts/config';
import DatabaseModule from './database/database.module';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import ProductModule from './products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
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
})
export class AppModule {}
