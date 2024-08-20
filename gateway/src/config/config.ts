import * as process from 'process';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.API_GATEWAY_PORT, 10),
  userServiceConfig: {
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.USER_PORT, 10),
      host: process.env.USER_HOST,
    },
  },
  productServiceConfig: {
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.PRODUCT_PORT, 10),
      host: process.env.PRODUCT_HOST,
    },
  },
});
