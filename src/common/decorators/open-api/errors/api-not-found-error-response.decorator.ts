import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_NOT_FOUND_MESSAGE } from '../../../constants';
import { NotFoundErrorResponse } from '../../../dto/responses/errors/not-found-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiNotFoundResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiNotFoundErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(NotFoundErrorResponse),
    ApiNotFoundResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(NotFoundErrorResponse) }],
      },
      description: DEFAULT_NOT_FOUND_MESSAGE,
      ...options,
    }),
  );
};
