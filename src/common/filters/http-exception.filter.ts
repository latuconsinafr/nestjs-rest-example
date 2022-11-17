import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DEFAULT_HELP_MESSAGE } from '../constants';
import { ErrorCode } from '../enums/error-code.enum';
import { BaseResponse } from '../interfaces/http/base-response.interface';

/**
 * Class describing implementation of an exception filter that catch {@link HttpException}.
 *
 * @see [Exception Filters](https://docs.nestjs.com/exception-filters)
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * The logger to logging any exception filter catches.
   */
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * {@inheritDoc ExceptionFilter.catch}
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus = exception.getStatus();

    const exceptionResponse =
      typeof exception.getResponse() === 'object'
        ? (exception.getResponse() as object)
        : { message: exception.getResponse() };

    const baseResponseBody: BaseResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
      message: 'Error',
    };

    const responseBody = {
      ...baseResponseBody,
      ...exceptionResponse,
      ...(httpStatus === 404
        ? { error: ErrorCode.ErrorNotFound, help: DEFAULT_HELP_MESSAGE }
        : undefined), //! Forcing route not found error to be exactly the same as the other not found exception error
    };

    response.status(httpStatus).json(responseBody);
  }
}
