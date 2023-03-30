import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiRequestTimeoutResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_REQUEST_TIMEOUT_MESSAGE } from '../../../constants';
import { RequestTimeoutErrorResponse } from '../../../dto/responses/errors/request-timeout-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiRequestTimeoutResponse},
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiRequestTimeoutErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(RequestTimeoutErrorResponse),
    ApiRequestTimeoutResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(RequestTimeoutErrorResponse) }],
      },
      description: DEFAULT_REQUEST_TIMEOUT_MESSAGE,
      ...options,
    }),
  );
};
