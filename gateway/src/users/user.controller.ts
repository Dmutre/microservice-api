import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { USER_SERVICE } from 'src/utils/consts/services.consts';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EmailDTO } from './dto/email.dto';

@ApiTags('Users')
@Controller('users')
export default class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post()
  async register(@Body() data: RegisterUserDTO) {
    return this.userService.send({ cmd: 'register_new_user' }, data);
  }

  @ApiOperation({ summary: 'Request email verification of user' })
  @Post('/email/request-verification')
  async requestEmailVerification(@Body() data: EmailDTO) {
    return this.userService.send({ cmd: 'request_email_verification' }, data);
  }
}
