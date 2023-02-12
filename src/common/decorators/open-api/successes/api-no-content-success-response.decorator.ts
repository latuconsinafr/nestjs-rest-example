import { applyDecorators } from '@nestjs/common';
import {
  ApiResponseOptions,
  ApiExtraModels,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { DEFAULT_NO_CONTENT_MESSAGE } from '../../../constants';
import { NoContentSuccessResponse } from '../../../dto/responses/successes/no-content-success-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiNoContentResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiNoContentSuccessResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator =>
  applyDecorators(
    ApiExtraModels(NoContentSuccessResponse),
    ApiNoContentResponse({
      description: DEFAULT_NO_CONTENT_MESSAGE,
      ...options,
    }),
  );
