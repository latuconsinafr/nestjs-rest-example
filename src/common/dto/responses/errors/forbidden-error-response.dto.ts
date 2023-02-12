import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '../../../enums/http/error-code.enum';
import { ErrorResponse } from '../error-response.dto';

/**
 * Defines the DTO that carries data representing a forbidden error response.
 *
 * @usageNotes
 * The DTO extends {@link ErrorResponse}.
 *
 * The ForbiddenErrorResponse contains error attribute:
 * - `statusCode`: The {@link HttpStatus} code
 * - `error`: The application error code
 */
export class ForbiddenErrorResponse extends ErrorResponse {
  @ApiProperty({
    description: 'The http status code',
    example: HttpStatus.FORBIDDEN,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The application error code',
    example: ErrorCode.ErrorForbidden,
  })
  error: ErrorCode;
}
