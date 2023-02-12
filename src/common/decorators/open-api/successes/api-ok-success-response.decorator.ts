import { applyDecorators } from '@nestjs/common';
import {
  ApiResponseOptions,
  ApiExtraModels,
  ApiOkResponse,
} from '@nestjs/swagger';
import { DEFAULT_OK_MESSAGE } from '../../../constants';
import { OkSuccessResponse } from '../../../dto/responses/successes/ok-success-response.dto';

/**
 * Decorator that combine {@link ApiExtraModels} and {@link ApiOkResponse},
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api response options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiOkSuccessResponse = (
  options?: ApiResponseOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator =>
  applyDecorators(
    ApiExtraModels(OkSuccessResponse),
    ApiOkResponse({
      description: DEFAULT_OK_MESSAGE,
      ...options,
    }),
  );
