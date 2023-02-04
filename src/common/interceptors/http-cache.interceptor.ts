import {
  CacheInterceptor,
  CACHE_KEY_METADATA,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { NOT_TO_BE_CACHED_KEY } from '../constants';

/**
 * By default, Nest uses the request URL (in an HTTP app) or cache key (in websockets and microservices apps,
 * set through the `@CacheKey()` decorator) to associate cache records with endpoints.
 *
 * This class is created in order to accomplish custom tracking set by override the `trackBy()` method.
 */
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected cachedRoutes = new Map<string, any>();

  protected trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();

    // * if there is no request, the incoming request is graphql, therefore bypass response caching.
    if (!request) {
      return undefined;
    }

    // * Get the not to be cached status meta data by the NOT_TO_BE_CACHED_METADATA
    const notToBeCachedMetaData = this.reflector.get(
      NOT_TO_BE_CACHED_KEY,
      context.getHandler(),
    );

    // * If the route handler not to be cached, then return undefined
    if (notToBeCachedMetaData) {
      return undefined;
    }

    const { httpAdapter } = this.httpAdapterHost;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;

    // * Get the cache key meta data by the CACHE_KEY_METADATA
    const cacheMetaData = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    // * If the app is not http (since websockets and microservices apps set through the @CacheKey() decorator)
    // * or the cache meta data exists then return the cache meta data immediately
    if (!isHttpApp || cacheMetaData) {
      return cacheMetaData;
    }

    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';

    // * If the incoming request is other than GET, then perform delete cache
    if (!isGetRequest) {
      // * setTimeout is used to not throttle the incoming http request and make it wait for the in-validating process
      // * (summary: this action would be on the next event cycle)
      setTimeout(async () => {
        for (const values of this.cachedRoutes.values()) {
          for (const value of values) {
            // * Don't need to worry about the cache manager as this class is extending the origin nestjs interceptor
            await this.cacheManager.del(value);
          }
        }
      }, 0);
      return undefined;
    }

    // * Get base url of the incoming get request.
    // * Example: `api/users/1`, `api/users?page=1&take=1` will be `api/users`
    const key = httpAdapter.getRequestUrl(request).split('?')[0];

    // * The resulted cachedRoutes will be something like:
    // * (e.g: '/api/users' => ['/api/users', '/api/users/1', '/api/users?search=username'])
    if (
      this.cachedRoutes.has(key) &&
      !this.cachedRoutes.get(key).includes(httpAdapter.getRequestUrl(request))
    ) {
      this.cachedRoutes.set(key, [
        ...this.cachedRoutes.get(key),
        httpAdapter.getRequestUrl(request),
      ]);

      return httpAdapter.getRequestUrl(request);
    }

    this.cachedRoutes.set(key, [httpAdapter.getRequestUrl(request)]);

    return httpAdapter.getRequestUrl(request);
  }
}
