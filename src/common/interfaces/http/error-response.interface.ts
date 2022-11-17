import { ErrorCode } from '../../enums/error-code.enum';
import { ValidationErrorResponse } from './base-response.interface';

/**
 * Defines the error response interface.
 */
export interface ErrorResponse {
  // * The error message, could be a string or validation error message if any, otherwise default message will be returned as response
  message?: string | ValidationErrorResponse[] | undefined;

  // * Application error code if any, otherwise the default error code from exception
  error?: ErrorCode | undefined;

  // * The help if any, otherwise default help message will be returned as response
  help?: string | null | undefined;
}
