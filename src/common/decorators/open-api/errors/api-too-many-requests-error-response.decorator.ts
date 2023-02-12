import { applyDecorators } from '@nestjs/common';
import {
  ApiTooManyRequestsResponse,
  ApiResponseOptions,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_TOO_MANY_REQUESTS_MESSAGE } from '../../../constants';
import { TooManyRequestsErrorResponse } from '../../../dto/responses/errors/too-many-requests-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiTooManyRequestsResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiTooManyRequestsErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(TooManyRequestsErrorResponse),
    ApiTooManyRequestsResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(TooManyRequestsErrorResponse) }],
      },
      description: DEFAULT_TOO_MANY_REQUESTS_MESSAGE,
      ...options,
    }),
  );
};
