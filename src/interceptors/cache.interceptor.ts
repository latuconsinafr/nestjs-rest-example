import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

/**
 * Defines interceptor for caching.
 */
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = false; // TODO: This should be moved to environment variable or app configuration

    if (isCached) {
      return of([]); // TODO: This should be replaced with cached value
    }

    return next.handle();
  }
}
