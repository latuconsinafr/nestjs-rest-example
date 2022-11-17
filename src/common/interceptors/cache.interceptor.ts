import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

/**
 * Defines interceptor for caching.
 *
 * @see [Interceptors](https://docs.nestjs.com/interceptors)
 * @see [Caching](https://docs.nestjs.com/techniques/caching#caching)
 */
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (this.isCached()) {
      return of([]); // TODO: This should be replaced with cached value
    }

    return next.handle();
  }

  // TODO: This should be moved to environment variable or app configuration
  /**
   * @returns The flag indicates that response should be cached or not.
   */
  private isCached(): boolean {
    return false;
  }
}
