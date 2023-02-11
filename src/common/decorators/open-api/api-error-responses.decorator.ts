import { applyDecorators } from '@nestjs/common';
import {
  ApiErrorResponse,
  ApiErrorResponseMetadata,
} from './api-error-response.decorator';

export const ApiErrorResponses = (
  metadata: ApiErrorResponseMetadata[],
): MethodDecorator & ClassDecorator => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = metadata.map((data) => ApiErrorResponse(data));

  return applyDecorators(...decorators);
};
