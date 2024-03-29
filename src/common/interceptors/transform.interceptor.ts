import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { NOT_TO_BE_TRANSFORMED_KEY } from '../constants';
import { SuccessResponse } from '../dto/responses/success-response.dto';

/**
 * Defines default response.
 */
export interface Response<T> {
  data: T;
}

/**
 * Defines interceptor for intercepting the outgoing response.
 *
 * This interceptor transform outgoing response to the shape of {@link BaseResponse} merged with SuccessResponse.
 *
 * @usageNotes
 * Any error response would be catch by `HttpExceptionFilter`.
 * Hence, this interceptor just transform outgoing success response.
 *
 * @see [Interceptors](https://docs.nestjs.com/interceptors)
 * @see [Exception Filters](https://docs.nestjs.com/exception-filters)
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  /**
   * The constructor.
   *
   * @param reflector The reflector to access the route's custom metadata
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // * Get the not to be transformed status meta data by the NOT_TO_BE_TRANSFORMED_KEY
    const notToBeTransformedMetadata = this.reflector.get(
      NOT_TO_BE_TRANSFORMED_KEY,
      context.getHandler(),
    );

    // * If the route handler not to be transformed, then return to the next handle
    if (notToBeTransformedMetadata) {
      return next.handle();
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const httpStatus = response.statusCode;

    const baseResponseBody = new SuccessResponse({
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: true,
      message: 'Success',
    });

    return next.handle().pipe(
      map((responseBody) => ({
        ...baseResponseBody,
        ...responseBody,
        message: responseBody?.message ?? baseResponseBody.message,
      })),
    );
  }
}
