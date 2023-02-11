import { applyDecorators } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiExtraModels,
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
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../dto/responses/error-response.dto';

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

export type ApiServerErrorResponse =
  | typeof ApiInternalServerErrorResponse
  | typeof ApiNotImplementedResponse
  | typeof ApiBadGatewayResponse
  | typeof ApiServiceUnavailableResponse
  | typeof ApiGatewayTimeoutResponse;

export interface ApiErrorResponseMetadata {
  response: ApiClientErrorResponse | ApiServerErrorResponse;
  options?: ApiResponseOptions;
}

export const ApiErrorResponse = (
  metadata: ApiErrorResponseMetadata,
): MethodDecorator & ClassDecorator => {
  const { response, options } = metadata;

  return applyDecorators(
    ApiExtraModels(ErrorResponse),
    response({
      schema: {
        allOf: [{ $ref: getSchemaPath(ErrorResponse) }],
      },
      description: options?.description,
    }),
  );
};
