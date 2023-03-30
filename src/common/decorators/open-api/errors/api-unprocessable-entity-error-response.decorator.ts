import { applyDecorators } from '@nestjs/common';
import {
  ApiUnprocessableEntityResponse,
  ApiResponseOptions,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE } from '../../../constants';
import { UnprocessableEntityErrorResponse } from '../../../dto/responses/errors/unprocessable-entity-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiUnprocessableEntityResponse},
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiUnprocessableEntityErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(UnprocessableEntityErrorResponse),
    ApiUnprocessableEntityResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(UnprocessableEntityErrorResponse) }],
      },
      description: DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE,
      ...options,
    }),
  );
};
