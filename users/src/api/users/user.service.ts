import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MAIL_SERVICE } from 'src/utils/consts/services.consts';

@Injectable()
export default class UserService {
  constructor(
    @Inject(MAIL_SERVICE) private readonly mailClient: ClientProxy,
  ) {}

  hello() {
    this.mailClient.emit('email_verification', {});
  }
}
