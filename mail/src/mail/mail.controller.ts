import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import MailService from './mail.service';
import { EmailTokenDTO } from './dto/email-token.dto';

@Controller()
export default class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('email_verification')
  async emailVerification(data: EmailTokenDTO) {
    await this.mailService.sendEmailVerification(data);
  }
}
