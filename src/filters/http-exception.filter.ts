import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '../common/enums/error.enum';
import { BaseResponse } from '../common/interfaces/http-response.interface';

/**
 * Default help message.
 */
const defaultHelpMessage = 'Help is not available';

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
        ? { error: ErrorCode.ErrorNotFound, help: defaultHelpMessage }
        : undefined), //! Forcing route not found error to be exactly the same as the other not found exception error
    };

    response.status(httpStatus).json(responseBody);
  }
}
