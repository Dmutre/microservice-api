import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { MicroserviceException } from '../exceptions/microservice.exception';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    if (exception instanceof MicroserviceException) {
      return throwError(() => exception);
    } else {
      console.log(exception);
      const newException = new MicroserviceException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return throwError(() => newException);
    }
  }
}
