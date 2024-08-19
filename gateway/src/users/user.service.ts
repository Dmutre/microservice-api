import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/utils/consts/services.consts';

@Injectable()
export default class UserService {
  private readonly logger = new Logger('UserService');

  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}
}
