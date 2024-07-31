import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export default class MailController {

  constructor() {}

  @EventPattern('email_verification')
  emailVerification() {
    console.log('We are here, PEREMOGA');
    return;
  }
}