import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiSuccessResponse,
  ApiSuccessResponseMetadata,
} from './api-success-response.decorator';

/**
 * Decorator that combines multiple {@link ApiSuccessResponse} decorators to apply swagger success response(s),
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @example
 * `ApiSuccessResponse({ response: ApiCreatedSuccessResponse })`
 *
 * @param metadata The array of api success response metadata
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiSuccessesResponse = <TModel extends Type<any>>(
  metadata: ApiSuccessResponseMetadata<TModel>[],
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(...metadata.map((data) => ApiSuccessResponse(data)));
};
