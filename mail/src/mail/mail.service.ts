import { Injectable } from '@nestjs/common';
import { EmailTokenDTO } from './dto/email-token.dto';
import { MailOptionsDto } from './dto/mail-options.dto';
import { MailerService } from '@nestjs-modules/mailer';
import MailConfig from 'src/config/mail.config';
import { resolve } from 'path';

@Injectable()
export default class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailConfig: MailConfig,
  ) {}

  private async send({ to, subject, message, link }: MailOptionsDto) {
    await this.mailerService.sendMail({
      to,
      subject,
      from: this.mailConfig.username,
      template: resolve('./mail/templates/template.hbs'),
      context: {
        message,
        link,
      },
    });
  }

  async sendEmailVerification(data: EmailTokenDTO) {
    const link: string = `${this.mailConfig.frontendUrl}/email/verify/${data.token}`;
    const message: string = 'Verify your email';
    const subject: string = 'Email verification';
    await this.send({ to: data.email, link, message, subject });
  }
}
