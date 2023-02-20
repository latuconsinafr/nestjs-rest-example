import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
import {
  DEFAULT_HELP_MESSAGE,
  DEFAULT_TOO_MANY_REQUESTS_MESSAGE,
} from '../constants';
import { ErrorResponse } from '../dto/responses/error-response.dto';
import { ErrorCode } from '../enums/http/error-code.enum';

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

    const baseResponseBody = new ErrorResponse({
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
      message: 'Error',
    });

    const responseBody = {
      ...baseResponseBody,
      ...exceptionResponse,
      ...(httpStatus === 403
        ? { error: ErrorCode.ErrorForbidden, help: DEFAULT_HELP_MESSAGE }
        : undefined), //! Forcing forbidden error to be exactly the same as the other exception error
      ...(httpStatus === 404
        ? { error: ErrorCode.ErrorNotFound, help: DEFAULT_HELP_MESSAGE }
        : undefined), //! Forcing route not found error to be exactly the same as the other not found exception error
      ...(httpStatus === 429
        ? {
            message: DEFAULT_TOO_MANY_REQUESTS_MESSAGE,
            error: ErrorCode.ErrorTooManyRequests,
            help: DEFAULT_HELP_MESSAGE,
          }
        : undefined), //! Forcing too many requests error to be exactly the same as the other not found exception error
    };

    response.status(httpStatus).json(responseBody);
  }
}
