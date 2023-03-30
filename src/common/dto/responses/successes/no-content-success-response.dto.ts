import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from '../success-response.dto';

/**
 * Defines the DTO that carries data representing a no content success response.
 *
 * @usageNotes
 * The DTO extends {@link SuccessResponse} of the shape of TData.
 *
 * The NoContentSuccessResponse of TData shape contains success response attribute:
 * - `statusCode`: The {@link HttpStatus} code
 */
export class NoContentSuccessResponse<
  TData = any,
> extends SuccessResponse<TData> {
  @ApiProperty({
    description: 'The http status code',
    example: HttpStatus.NO_CONTENT,
  })
  statusCode: HttpStatus;
}
