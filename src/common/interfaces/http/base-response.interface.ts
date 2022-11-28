import { HttpStatus } from '@nestjs/common';

/**
 * Defines the base response type.
 * This is a mandatory response structure either for success or error response.
 */
export type BaseResponse = {
  // * Refer to HTTP status code
  statusCode: HttpStatus;

  // * The timestamp itself is being converted to ISO string
  timestamp: string;

  // * The requested url path
  path: string;

  // * True/false
  success: boolean;

  // * The response message
  message: string;
};

/**
 * Defines the shape of validation error response type.
 */
export type ValidationErrorResponse = {
  // * The property which is fail to validate
  property: string;

  // * The constraint which is fail to validate
  constraints: string[] | ValidationErrorResponse[];
};
