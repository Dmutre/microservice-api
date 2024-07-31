import { Transport } from '@nestjs/microservices';
import * as process from 'process';

export default () => ({
  serviceOptions: {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.QUEUE_NAME,
      queueOptions: {
        durable: false,
      },
    },
  },
  mail: {
    host: process.env.SMTP_HOST,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
});
