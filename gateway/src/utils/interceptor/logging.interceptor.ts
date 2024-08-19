import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Logger interceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      tap(
        (data) => {
          const responseTime = Date.now() - now;
          this.logger.log(`${method} ${url} - ${responseTime}ms`, {
            context: 'HTTP Response',
            data,
          });
        },
        (error) => {
          this.logger.error(`${method} ${url} - Error`, {
            context: 'HTTP Error',
            error: error.response || error.message,
          });
        },
      ),
    );
  }
}
