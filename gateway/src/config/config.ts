import * as process from 'process';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.API_GATEWAY_PORT, 10),
  userServiceConfig: {
    transport: Transport.TCP,
    options: {
      port: process.env.USER_PORT,
      host: process.env.USER_HOST,
    },
  },
});
