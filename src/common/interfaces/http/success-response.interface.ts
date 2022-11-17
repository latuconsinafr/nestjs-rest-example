/**
 * Defines the success response interface.
 */
export interface SuccessResponse {
  // * The additional message if any, otherwise null
  message?: string | undefined;

  // * The returned data if any, otherwise undefined or null
  data?: object | null | undefined;
}
