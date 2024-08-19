import { Module } from '@nestjs/common';
import UserModule from './api/users/user.module';
import DatabaseModule from './database/database.module';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
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
