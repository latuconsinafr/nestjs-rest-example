import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorCode } from '../common/enums/error-code.enum';
import { BaseResponse } from '../common/interfaces/http-response.interface';

/**
 * Defines the all exceptions filter.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  /**
   * The constructor.
   *
   * @param httpAdapterHost The http adapter host
   */
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

    const baseResponseBody: BaseResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      success: false,
      message: 'Error',
    };

    const responseBody = {
      ...baseResponseBody,
      ...response,
      ...(httpStatus === 404
        ? { error: ErrorCode.ERR_NOT_FOUND, help: 'Help is not available' }
        : undefined), //! Forcing route not found error to be exactly the same as the other not found exception error
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
