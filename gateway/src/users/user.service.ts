import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/utils/consts/services.consts';

@Injectable()
export default class UserService {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}
}
