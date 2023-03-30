import { Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiAcceptedResponse,
  ApiNoContentResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { ApiCreatedSuccessResponse } from './successes/api-created-success-response.decorator';
import { ApiNoContentSuccessResponse } from './successes/api-no-content-success-response.decorator';
import { ApiOkSuccessResponse } from './successes/api-ok-success-response.decorator';

/**
 * Defines the type of api successful response.
 */
export type ApiSuccessfulResponse =
  | typeof ApiOkResponse
  | typeof ApiCreatedResponse
  | typeof ApiAcceptedResponse
  | typeof ApiNoContentResponse;

/**
 * Defines the type of api custom successful response.
 */
export type ApiCustomSuccessfulResponse =
  | typeof ApiOkSuccessResponse
  | typeof ApiCreatedSuccessResponse
  | typeof ApiNoContentSuccessResponse;

/**
 * Defines the interface for api success response meta data.
 */
export interface ApiSuccessResponseMetadata<TModel extends Type<any>> {
  response: ApiSuccessfulResponse | ApiCustomSuccessfulResponse;
  options?: ApiResponseOptions | ApiSuccessResponseMetadataOptions<TModel>;
}

/**
 * Defines the interface for api success response meta data options.
 */
export interface ApiSuccessResponseMetadataOptions<TModel extends Type<any>> {
  model?: TModel;
  isArray?: boolean;
  options?: ApiResponseOptions;
}

/**
 * Decorator that encapsulates any success response of type of {@link ApiSuccessfulResponse} and {@link ApiCustomSuccessfulResponse}
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The api success response meta data
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiSuccessResponse = <TModel extends Type<any>>(
  metadata: ApiSuccessResponseMetadata<TModel>,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  const { response, options } = metadata;

  return response({ ...options });
};
