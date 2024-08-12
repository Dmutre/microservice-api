import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: any = { message: 'Internal server error' };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = exception.getResponse();
    } else if (exception.message && exception.status) {
      status = exception.status;
      messages = exception.message;
    } else if (
      typeof exception === 'object' &&
      'message' in exception &&
      'error' in exception
    ) {
      status = exception.error.status;
      messages = exception.error.message;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      messages,
    });
  }
}
