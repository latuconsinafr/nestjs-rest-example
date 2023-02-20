import { applyDecorators } from '@nestjs/common';
import { ApiParamOptions, ApiParam } from '@nestjs/swagger';

/**
 * Decorator that encapsulates {@link ApiParam} for param with type of String with UUID format,
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The api param options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiUuidParam = (
  options: ApiParamOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator =>
  applyDecorators(
    ApiParam({
      type: String,
      format: 'uuid',
      description: 'The identifier',
      example: 'dafaa89e-232c-42b8-a33e-3b75288645f1',
      ...options,
    }),
  );
