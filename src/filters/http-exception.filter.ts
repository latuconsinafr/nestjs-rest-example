import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '../common/enums/error-code.enum';
import { BaseResponse } from '../common/interfaces/http-response.interface';

/**
 * Defines the http exceptions filter.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * {@inheritDoc ExceptionFilter.catch}
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const httpStatus = exception.getStatus();
    const request = ctx.getResponse<Request>();
    const response = ctx.getResponse<Response>();

    const exceptionResponse =
      typeof exception.getResponse() === 'object'
        ? (exception.getResponse() as object)
        : { message: exception.getResponse() };

    const baseResponseBody: BaseResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url ?? 'Path not found', // TODO: Temporary solution, it has to be the original requested URL
      success: false,
      message: 'Error',
    };

    const responseBody = {
      ...baseResponseBody,
      ...exceptionResponse,
      ...(httpStatus === 404
        ? { error: ErrorCode.ERR_NOT_FOUND, help: 'Help is not available' }
        : undefined), //! Forcing route not found error to be exactly the same as the other not found exception error
    };

    response.status(httpStatus).json(responseBody);
  }
}
