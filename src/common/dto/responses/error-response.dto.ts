import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_HELP_MESSAGE } from '../../constants';
import { ErrorCode } from '../../enums/http/error-code.enum';
import { ValidationErrors } from '../../interfaces/http/validation-errors.interface';

/**
 * Defines the DTO that carries the error response.
 *
 * @usageNotes
 * The Error Response contains user attribute:
 * - `statusCode`: The {@link HttpStatus} code
 * - `timestamp`: The time when the request was made
 * - `path`: The requested url/path
 * - `success`: The request status, which is always `true`
 * - `message`: The response message, either an error message or a validation error message
 * - `error`: The application error code
 * - `help`: The help message related to error
 */
export class ErrorResponse {
  @ApiProperty({
    description: 'The http status code',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The time when the request was made',
    example: '2023-02-11T05:24:50.680Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'The requested url/path',
    example: '/api/v1/auth/sign-in',
  })
  path: string;

  @ApiProperty({
    description: 'The request status',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'The response message',
    example: 'Error',
  })
  message: string | ValidationErrors[];

  @ApiProperty({
    description: 'The application error code',
    example: ErrorCode.ErrorInternalServerError,
  })
  error: ErrorCode;

  @ApiProperty({
    description: 'The help message related to error',
    example: DEFAULT_HELP_MESSAGE,
  })
  help: string;

  /**
   * Instantiate a `ErrorResponse`.
   *
   * @example
   * ```ts
   * new ErrorResponse({
   *    message: 'Error',
   *    error: ErrorCode.ErrorInternalServerError
   *    help: 'Help is not available'
   * })
   * ```
   *
   * @usageNotes
   * By most cases, the response only take two properties:
   * - `message`: The message to be returned
   * - `error`: The application error code to be returned
   * - `help`: The help message related to error to be returned
   *
   * @param partial The error response to be returned
   */
  constructor(partial?: Partial<ErrorResponse>) {
    Object.assign(this, partial);
  }
}
