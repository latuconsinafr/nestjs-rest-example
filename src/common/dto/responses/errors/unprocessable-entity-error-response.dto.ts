import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '../../../enums/http/error-code.enum';
import { ErrorResponse } from '../error-response.dto';

/**
 * Defines the DTO that carries data representing an unprocessable entity error response.
 *
 * @usageNotes
 * The DTO extends {@link ErrorResponse}.
 *
 * The UnprocessableEntityErrorResponse contains error attribute:
 * - `statusCode`: The {@link HttpStatus} code
 * - `error`: The application error code
 */
export class UnprocessableEntityErrorResponse extends ErrorResponse {
  @ApiProperty({
    description: 'The http status code',
    example: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'The application error code',
    example: ErrorCode.ErrorUnprocessableEntity,
  })
  error: ErrorCode;
}
