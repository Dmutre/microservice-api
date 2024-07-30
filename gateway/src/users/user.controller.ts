import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { USER_SERVICE } from 'src/utils/consts/services.consts';

@ApiTags('Users')
@Controller('users')
export default class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @Get()
  async get() {
    const response = await this.userService
      .send({ cmd: 'hello' }, {})
      .toPromise();
    return response;
  }
}
