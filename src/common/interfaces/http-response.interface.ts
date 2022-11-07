import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

/**
 * Defines the base response interface.
 */
export interface BaseResponse {
  statusCode: HttpStatus; // * Refer to HTTP status code
  timestamp: string; // * The timestamp itself is being converted to ISO string
  path: string; // * The requested url path
  success: boolean; // * True/false
  message: string; // * The response message
}

/**
 * Defines the success response interface.
 */
export interface SuccessResponse {
  message?: string; // * The additional message if any, otherwise null
  data?: object; // * The returned data if any, otherwise undefined
}

/**
 * Defines the validation error response interface.
 */
export interface ValidationErrorResponse {
  property: string; // * The property which is fail to validate
  constraints: string[]; // * The constraint which is fail to validate
}

/**
 * Defines the error response interface.
 */
export interface ErrorResponse {
  message?: string | ValidationErrorResponse[]; // * The error message, could be a string or validation error message if any, otherwise default message will be returned as response
  error?: ErrorCode; // * Application error code if any, otherwise the default error code from exception
  help?: string; // * The help if any, otherwise default help message will be returned as response
}
