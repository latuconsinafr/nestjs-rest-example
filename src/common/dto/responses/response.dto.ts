import { SuccessResponse } from '../../interfaces/http-response.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SuccessResponseDto extends SuccessResponse {}

/**
 * Defines the default success response DTO.
 */
export class SuccessResponseDto {
  /**
   * Instantiate a `SuccessResponseDto`.
   *
   * @example
   * ```ts
   * new SuccessResponseDto({
   *    message: 'Success',
   *    data: null
   * })
   * ```
   *
   * @usageNotes
   * By default, the response contains two properties:
   * - `message`: The message to be returned, if any
   * - `data`: The data to be returned, if any
   *
   * @param successResponse The success response to be returned
   */
  constructor(successResponse?: SuccessResponse) {
    this.message = successResponse?.message;
    this.data = successResponse?.data;
  }
}
