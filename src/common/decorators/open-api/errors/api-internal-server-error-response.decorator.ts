import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE } from '../../../constants';
import { InternalServerErrorErrorResponse } from '../../../dto/responses/errors/internal-server-error-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiInternalServerErrorResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiInternalServerErrorErrorResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(InternalServerErrorErrorResponse),
    ApiInternalServerErrorResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(InternalServerErrorErrorResponse) }],
      },
      description: DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE,
      ...options,
    }),
  );
};
