import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiGatewayTimeoutResponse,
  ApiGoneResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiNotFoundResponse,
  ApiNotImplementedResponse,
  ApiPayloadTooLargeResponse,
  ApiPreconditionFailedResponse,
  ApiRequestTimeoutResponse,
  ApiResponseOptions,
  ApiServiceUnavailableResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { ApiConflictErrorResponse } from './errors/api-conflict-error-response.decorator';
import { ApiForbiddenErrorResponse } from './errors/api-forbidden-error-response.decorator';
import { ApiInternalServerErrorErrorResponse } from './errors/api-internal-server-error-response.decorator';
import { ApiNotFoundErrorResponse } from './errors/api-not-found-error-response.decorator';
import { ApiRequestTimeoutErrorResponse } from './errors/api-request-timeout-error-response.decorator';
import { ApiTooManyRequestsErrorResponse } from './errors/api-too-many-requests-error-response.decorator';
import { ApiUnauthorizedErrorResponse } from './errors/api-unauthorized-error-response.decorator';
import { ApiUnprocessableEntityErrorResponse } from './errors/api-unprocessable-entity-error-response.decorator';

/**
 * Defines the type of api client error response.
 */
export type ApiClientErrorResponse =
  | typeof ApiBadRequestResponse
  | typeof ApiUnauthorizedResponse
  | typeof ApiForbiddenResponse
  | typeof ApiNotFoundResponse
  | typeof ApiMethodNotAllowedResponse
  | typeof ApiRequestTimeoutResponse
  | typeof ApiConflictResponse
  | typeof ApiGoneResponse
  | typeof ApiPreconditionFailedResponse
  | typeof ApiPayloadTooLargeResponse
  | typeof ApiUnsupportedMediaTypeResponse
  | typeof ApiUnprocessableEntityResponse
  | typeof ApiPreconditionFailedResponse
  | typeof ApiTooManyRequestsResponse;

/**
 * Defines the type of api server error response.
 */
export type ApiServerErrorResponse =
  | typeof ApiInternalServerErrorResponse
  | typeof ApiNotImplementedResponse
  | typeof ApiBadGatewayResponse
  | typeof ApiServiceUnavailableResponse
  | typeof ApiGatewayTimeoutResponse;

/**
 * Defines the type of custom api error response.
 */
export type ApiCustomErrorResponse =
  | typeof ApiConflictErrorResponse
  | typeof ApiForbiddenErrorResponse
  | typeof ApiInternalServerErrorErrorResponse
  | typeof ApiNotFoundErrorResponse
  | typeof ApiRequestTimeoutErrorResponse
  | typeof ApiTooManyRequestsErrorResponse
  | typeof ApiUnauthorizedErrorResponse
  | typeof ApiUnprocessableEntityErrorResponse;

/**
 * Defines the interface for api error response meta data.
 */
export interface ApiErrorResponseMetadata {
  response:
    | ApiClientErrorResponse
    | ApiServerErrorResponse
    | ApiCustomErrorResponse;
  options?: ApiResponseOptions;
}

/**
 * Decorator that encapsulates any error response of type of {@link ApiClientErrorResponse}, {@link ApiServerErrorResponse} and {@link ApiCustomErrorResponse},
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The api error response meta data
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiErrorResponse = (
  metadata: ApiErrorResponseMetadata,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  const { response, options } = metadata;

  return response({ ...options });
};
