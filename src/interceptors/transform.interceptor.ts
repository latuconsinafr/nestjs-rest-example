import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import {
  BaseResponse,
  SuccessResponse,
} from '../common/interfaces/http-response.interface';

/**
 * Defines default response.
 */
export interface Response<T> {
  data: T;
}

/**
 * Defines the base success response interface & also implemented class.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseSuccessResponse extends SuccessResponse {}
export class BaseSuccessResponse {
  constructor(successMessage?: SuccessResponse) {
    this.message = successMessage?.message;
    this.data = successMessage?.data;
  }
}

/**
 * Defines interceptor to transform all application responses.
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const baseResponseBody: BaseResponse = {
      statusCode: response.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: true,
      message: 'Success',
    };

    return next.handle().pipe(
      map((responseBody) => ({
        ...baseResponseBody,
        ...responseBody,
        message: responseBody?.message ?? baseResponseBody.message,
      })),
    );
  }
}
