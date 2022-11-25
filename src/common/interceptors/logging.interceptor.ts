import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
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
   * The constructor.
   *
   * @param logger The injected pino logger
   */
  constructor(
    @InjectPinoLogger(LoggingInterceptor.name)
    private readonly logger: Logger,
  ) {}

  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.switchToHttp().getRequest().url;

    this.logger.log(`Start hitting ${url}...`);

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap((res) =>
          this.logger.log(`After... ${Date.now() - now}ms`, { res: res }),
        ),
      );
  }
}
