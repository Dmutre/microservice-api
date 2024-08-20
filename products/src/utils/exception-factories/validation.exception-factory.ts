import { HttpStatus } from '@nestjs/common';
import { MicroserviceException } from '../exceptions/microservice.exception';

export function validationExceptionFactory(errors) {
  const messages = errors.map((error) => {
    return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
  });
  return new MicroserviceException(messages, HttpStatus.BAD_REQUEST);
}
