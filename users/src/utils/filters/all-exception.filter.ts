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
    console.log(exception);
    if (exception instanceof MicroserviceException) {
      return throwError(() => exception);
    } else {
      const newException = new MicroserviceException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      return throwError(() => newException);
    }
  }
}
