/**
 * Defines enum for application error code.
 */
export enum ErrorCode {
  /**
   * Defines code for the unauthorized error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401 documentation}
   */
  ErrorUnauthorized = 'error-unauthorized',

  /**
   * Defines code for the forbidden error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403 documentation}
   */
  ErrorForbidden = 'error-forbidden',

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
   * Defines code for the conflict error exception.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409 documentation}
   */
  ErrorConflict = 'error-conflict',

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
