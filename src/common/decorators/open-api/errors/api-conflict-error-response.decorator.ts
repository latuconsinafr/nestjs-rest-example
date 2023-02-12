import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiExtraModels,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_CONFLICT_MESSAGE } from '../../../constants';
import { ConflictErrorResponse } from '../../../dto/responses/errors/conflict-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiConflictResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiConflictErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(ConflictErrorResponse),
    ApiConflictResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(ConflictErrorResponse) }],
      },
      description: DEFAULT_CONFLICT_MESSAGE,
      ...options,
    }),
  );
};
