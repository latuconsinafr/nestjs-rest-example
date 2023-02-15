import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_FORBIDDEN_MESSAGE } from '../../../constants';
import { ForbiddenErrorResponse } from '../../../dto/responses/errors/forbidden-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiForbiddenResponse},
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiForbiddenErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(ForbiddenErrorResponse),
    ApiForbiddenResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ForbiddenErrorResponse) }],
      },
      description: DEFAULT_FORBIDDEN_MESSAGE,
      ...options,
    }),
  );
};
