import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([])],
})
export default class UserModule {}
