/**
 * Defines enum for application error code.
 */
export enum ErrorCode {
  /**
   * Defines code for the resource not found error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404 documentation}
   */
  ErrorNotFound = 'error-not-found',

  /**
   * Defines code for the request timeout error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408 documentation}
   */
  ErrorRequestTimeout = 'error-request-timeout',

  /**
   * Defines code for the unprocessable entity error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422 documentation}
   */
  ErrorUnprocessableEntity = 'error-unprocessable-entity',

  /**
   * Defines code for the internal server error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 documentation}
   */
  ErrorInternalServerError = 'error-internal-server-error',
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
  ErrorNotFoundMessage = 'Resource not found',

  /**
   * Defines default message for the request timeout error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408 documentation}
   */
  ErrorRequestTimeoutMessage = 'Request timeout',

  /**
   * Defines default message for the unprocessable entity error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422 documentation}
   */
  ErrorUnprocessableEntityMessage = 'Unprocessable entity',

  /**
   * Defines default message for the internal server error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 documentation}
   */
  ErrorInternalServerErrorMessage = 'Internal server error',
}
