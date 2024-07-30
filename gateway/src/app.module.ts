import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import UserModule from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
