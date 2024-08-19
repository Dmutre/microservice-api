import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EmailDTO } from './dto/email.dto';
import UserService from './user.service';

@ApiTags('Users')
@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post()
  async register(@Body() data: RegisterUserDTO) {
    //return this.userService.send({ cmd: 'register_new_user' }, data);
  }

  @ApiOperation({ summary: 'Request email verification of user' })
  @Post('/email/request-verification')
  async requestEmailVerification(@Body() data: EmailDTO) {
    //return this.userService.send({ cmd: 'request_email_verification' }, data);
  }
}
