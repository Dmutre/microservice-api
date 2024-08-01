import { Transport } from '@nestjs/microservices';
import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,
  db: {
    port: parseInt(process.env.DB_PORT, 10),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    refreshTtl: process.env.REFRESH_TTL,
    secret: process.env.JWT_SECRET,
  },
  mailService: {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.QUEUE_NAME,
      queueOptions: {
        durable: false,
      },
    },
  },
});
