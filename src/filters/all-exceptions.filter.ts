import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ERR_NOT_FOUND } from '../common/constants/error.constant';

/**
 * Defines the all exceptions filter.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * {@inheritDoc ExceptionFilter.catch}
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);

    // * In certain situations `httpAdapter` might not be available in the constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const response =
      exception instanceof HttpException &&
      typeof exception.getResponse() === 'object'
        ? (exception.getResponse() as object)
        : undefined;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      ...response,
      ...(httpStatus === 404 ? { error: ERR_NOT_FOUND } : undefined), //! Forcing route not found error to be exactly the same as the other not found exception error
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
