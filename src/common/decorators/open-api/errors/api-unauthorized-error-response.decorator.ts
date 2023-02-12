import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponseOptions,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_UNAUTHORIZED_MESSAGE } from '../../../constants';
import { UnauthorizedErrorResponse } from '../../../dto/responses/errors/unauthorized-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiUnauthorizedResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiUnauthorizedErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(UnauthorizedErrorResponse),
    ApiUnauthorizedResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(UnauthorizedErrorResponse) }],
      },
      description: DEFAULT_UNAUTHORIZED_MESSAGE,
      ...options,
    }),
  );
};
