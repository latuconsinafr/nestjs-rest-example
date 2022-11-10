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
import { RequestTimeoutException } from '../exceptions/http.exceptions';

/**
 * Defines interceptor for intercepting any incoming request that exceed the maximum allowed request time.
 * The maximum allowed request time could be configured in app.constant.ts {@link APP_MAX_TIMEOUT}.
 *
 * @see [Interceptors](https://docs.nestjs.com/interceptors)
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
