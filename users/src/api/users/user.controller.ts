import { Controller } from '@nestjs/common';
import UserService from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'hello' })
  hello() {
    return 'Hello';
  }
}
