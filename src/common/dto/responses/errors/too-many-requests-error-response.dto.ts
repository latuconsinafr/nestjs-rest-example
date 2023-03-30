import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '../../../enums/http/error-code.enum';
import { ErrorResponse } from '../error-response.dto';

/**
 * Defines the DTO that carries data representing a too many requests error response.
 *
 * @usageNotes
 * The DTO extends {@link ErrorResponse}.
 *
 * The TooManyRequestsResponse contains error attribute:
 * - `statusCode`: The {@link HttpStatus} code
 * - `error`: The application error code
 */
export class TooManyRequestsErrorResponse extends ErrorResponse {
  @ApiProperty({
    description: 'The http status code',
    example: HttpStatus.TOO_MANY_REQUESTS,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The application error code',
    example: ErrorCode.ErrorTooManyRequests,
  })
  error: ErrorCode;
}
