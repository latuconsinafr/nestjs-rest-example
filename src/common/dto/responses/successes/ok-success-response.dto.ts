import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from '../success-response.dto';

/**
 * Defines the DTO that carries data representing a ok success response.
 *
 * @usageNotes
 * The DTO extends {@link SuccessResponse} of the shape of TData.
 *
 * The OkSuccessResponse of TData shape contains success response attribute:
 * - `statusCode`: The {@link HttpStatus} code
 */
export class OkSuccessResponse<TData = any> extends SuccessResponse<TData> {
  @ApiProperty({
    description: 'The http status code',
    example: HttpStatus.OK,
  })
  statusCode: HttpStatus;
}
