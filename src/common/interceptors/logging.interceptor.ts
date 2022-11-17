import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * Defines interceptor for logging the time takes between a specified incoming request and outgoing response.
 *
 * @see [Interceptors](https://docs.nestjs.com/interceptors)
 * @see [Logger](https://docs.nestjs.com/techniques/logger#logger)
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * The logger to logging the time takes between a specified incoming request and outgoing response.
   */
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.switchToHttp().getRequest().url;

    this.logger.log(`Start hitting ${url}...`);

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`After... ${Date.now() - now}ms`)));
  }
}
