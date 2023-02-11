import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Defines the DTO that carries the success response.
 *
 * @usageNotes
 * The Success Response of TData contains user attribute:
 * - `statusCode`: The {@link HttpStatus} code
 * - `timestamp`: The time when the request was made
 * - `path`: The requested url/path
 * - `success`: The request status, which is always `true`
 * - `message`: The response message
 * - `data`: The response data of shape TData, if any
 */
export class SuccessResponse<TData = any> {
  @ApiProperty({
    description: 'The http status code',
    example: HttpStatus.OK,
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
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'The response message',
    example: 'Success',
  })
  message: string;

  // * @see {@link https://docs.nestjs.com/openapi/operations#advanced-generic-apiresponse}
  data?: TData | null | undefined;

  /**
   * Instantiate a `SuccessResponse`.
   *
   * @example
   * ```ts
   * new SuccessResponse({
   *    message: 'Success',
   *    data: null
   * })
   * ```
   *
   * @usageNotes
   * By most cases, the response only take two properties:
   * - `message`: The message to be returned, if any
   * - `data`: The data to be returned, if any
   *
   * @param partial The success response of TData to be returned
   */
  constructor(partial?: Partial<SuccessResponse<TData>>) {
    Object.assign(this, partial);
  }
}
