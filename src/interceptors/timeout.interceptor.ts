import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import {
  Observable,
  timeout,
  catchError,
  TimeoutError,
  throwError,
} from 'rxjs';
import { APP_MAX_TIMEOUT } from '../common/constants/app.constant';
import { RequestTimeoutException } from '../exceptions/request-timeout.exception';

/**
 * Defines interceptor to handle request timeout.
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(APP_MAX_TIMEOUT),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }

        return throwError(() => err);
      }),
    );
  }
}
