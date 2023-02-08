import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
import { DEFAULT_FORBIDDEN_MESSAGE, DEFAULT_HELP_MESSAGE } from '../constants';
import { ErrorCode } from '../enums/http/error-code.enum';
import { BaseResponse } from '../interfaces/http/base-response.interface';

/**
 * Class describing implementation of an exception filter that catch {@link HttpException}.
 *
 * @see [Exception Filters](https://docs.nestjs.com/exception-filters)
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * The constructor.
   *
   * @param logger The injected pino logger
   */
  constructor(
    @InjectPinoLogger(HttpExceptionFilter.name)
    private readonly logger: Logger,
  ) {}

  /**
   * {@inheritDoc ExceptionFilter.catch}
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus = exception.getStatus();

    if (httpStatus >= 400 && httpStatus <= 499) {
      this.logger.warn(exception);
    } else {
      this.logger.error(exception);
    }

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
      ...(httpStatus === 403
        ? {
            message: DEFAULT_FORBIDDEN_MESSAGE,
            error: ErrorCode.ErrorForbidden,
            help: DEFAULT_HELP_MESSAGE,
          }
        : undefined), //! Forcing forbidden error to be exactly the same as the other exception error
    };

    response.status(httpStatus).json(responseBody);
  }
}
