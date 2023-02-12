// * App constants section
/**
 * Defines the application name.
 */
export const APP_NAME = 'Personal Practice';

/**
 * Defines the application description.
 */
export const APP_DESCRIPTION =
  'This is an API of Personal Practice Application';

/**
 * Defines current application global prefix.
 */
export const APP_GLOBAL_PREFIX = 'api';

/**
 * Defines current application version.
 */
export const APP_VERSION = '1';

/**
 * Defines current application terms of service.
 */
export const APP_TERMS_OF_SERVICE = 'tos';

/**
 * Defines the application author name.
 */
export const APP_AUTHOR_NAME = 'Farista Latuconsina';

/**
 * Defines the application author url.
 */
export const APP_AUTHOR_URL = 'https://github.com/latuconsinafr';

/**
 * Defines the application author e-maul address.
 */
export const APP_AUTHOR_EMAIL = 'faristalatuconsina@gmail.com';

/**
 * Defines the application license.
 */
export const APP_LICENSE = 'MIT';

/**
 * Defines the application license url.
 */
export const APP_LICENSE_URL = 'https://opensource.org/licenses/MIT';

/**
 * Defines the application maximum timeout in ms.
 */
export const APP_MAX_TIMEOUT = 2500;

// * Default messages section
/**
 * Defines the default message for help response.
 */
export const DEFAULT_HELP_MESSAGE = 'Help is not available';

/**
 * Defines default message for the ok success response.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200 documentation}
 */
export const DEFAULT_OK_MESSAGE = 'Ok';

/**
 * Defines default message for the created success response.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201 documentation}
 */
export const DEFAULT_CREATED_MESSAGE = 'Created';

/**
 * Defines default message for the no content success response.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204 documentation}
 */
export const DEFAULT_NO_CONTENT_MESSAGE = 'No content';

/**
 * Defines default message for the unauthorized error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404 documentation}
 */
export const DEFAULT_UNAUTHORIZED_MESSAGE = 'Unauthorized';

/**
 * Defines default message for the forbidden error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404 documentation}
 */
export const DEFAULT_FORBIDDEN_MESSAGE = 'Forbidden';

/**
 * Defines default message for the resource not found error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404 documentation}
 */
export const DEFAULT_NOT_FOUND_MESSAGE = 'Resource not found';

/**
 * Defines default message for the request timeout error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408 documentation}
 */
export const DEFAULT_REQUEST_TIMEOUT_MESSAGE = 'Request timeout';

/**
 * Defines default message for the conflict error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409 documentation}
 */
export const DEFAULT_CONFLICT_MESSAGE = 'Conflict';

/**
 * Defines default message for the unprocessable entity error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422 documentation}
 */
export const DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE = 'Unprocessable entity';

/**
 * Defines default message for the too many requests error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429 documentation}
 */
export const DEFAULT_TOO_MANY_REQUESTS_MESSAGE = 'Too many requests';

/**
 * Defines default message for the internal server error exception.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500 documentation}
 */
export const DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

// * Meta data key section
/**
 * Defines the not to be cached metadata key.
 *
 * @see {@link https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata documentation}
 */
export const NOT_TO_BE_CACHED_KEY = 'cache_interceptor:not_to_be_cached';

/**
 * Defines the not to be transformed metadata key.
 *
 * @see {@link https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata documentation}
 */
export const NOT_TO_BE_TRANSFORMED_KEY =
  'transform_interceptor:not_to_be_transformed';

/**
 * Defines the not to be timeout-ed metadata key.
 *
 * @see {@link https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata documentation}
 */
export const NOT_TO_BE_TIMEOUTED_KEY =
  'timeout_interceptor:not_to_be_timeouted';
