/**
 * Defines enum for all application error code.
 */
export enum ErrorCode {
  /**
   * Defines code for the resource not found error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404 documentation}
   */
  ERR_NOT_FOUND = 'error-not-found',

  /**
   * Defines code for the request timeout error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408 documentation}
   */
  ERR_REQUEST_TIMEOUT = 'error-request-timeout',

  /**
   * Defines code for the unprocessable entity error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422 documentation}
   */
  ERR_UNPROCESSABLE_ENTITY = 'error-unprocessable-entity',
}
