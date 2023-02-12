import { applyDecorators } from '@nestjs/common';
import {
  ApiResponseOptions,
  ApiExtraModels,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { DEFAULT_CREATED_MESSAGE } from '../../../constants';
import { CreatedSuccessResponse } from '../../../dto/responses/successes/created-success-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiCreatedResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiCreatedSuccessResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    ApiExtraModels(CreatedSuccessResponse),
    ApiCreatedResponse({
      description: DEFAULT_CREATED_MESSAGE,
      ...options,
    }),
  );
};
