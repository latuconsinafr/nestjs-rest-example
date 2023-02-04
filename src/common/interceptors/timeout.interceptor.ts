import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Observable,
  timeout,
  catchError,
  TimeoutError,
  throwError,
} from 'rxjs';
import { APP_MAX_TIMEOUT, NOT_TO_BE_TIMEOUTED_KEY } from '../constants';
import { RequestTimeoutException } from '../exceptions/request-timeout.exception';

/**
 * Defines interceptor for intercepting any incoming request that exceed the maximum allowed request time.
 *
 * The maximum allowed request time could be configured in app.constant.ts {@link APP_MAX_TIMEOUT}.
 *
 * @see [Interceptors](https://docs.nestjs.com/interceptors)
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  /**
   * The constructor.
   *
   * @param reflector The reflector to access the route's custom metadata
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // * Get the not to be timeouted status meta data by the NOT_TO_BE_TIMEOUTED_METADATA
    const notToBeTimeouted = this.reflector.get(
      NOT_TO_BE_TIMEOUTED_KEY,
      context.getHandler(),
    );

    // * If the route handler not to be timeouted, then return to the next handle
    if (notToBeTimeouted) {
      return next.handle();
    }

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
