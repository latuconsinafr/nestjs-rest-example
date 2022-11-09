/**
 * Defines enum for application error code.
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

  /**
   * Defines code for the internal server error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 documentation}
   */
  ERR_INTERNAL_SERVER_ERROR = 'error-internal-server-error',
}

/**
 * Defines enum for application error message.
 */
export enum ErrorMessage {
  /**
   * Defines default message for the resource not found error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404 documentation}
   */
  ERR_NOT_FOUND_MESSAGE = 'Resource not found',

  /**
   * Defines default message for the request timeout error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408 documentation}
   */
  ERR_REQUEST_TIMEOUT_MESSAGE = 'Request timeout',

  /**
   * Defines default message for the unprocessable entity error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422 documentation}
   */
  ERR_UNPROCESSABLE_ENTITY_MESSAGE = 'Unprocessable entity',

  /**
   * Defines default message for the internal server error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 documentation}
   */
  ERR_INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error',
}
