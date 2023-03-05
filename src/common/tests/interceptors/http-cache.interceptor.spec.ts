import { Test } from '@nestjs/testing';
import { mockedExecutionContext } from '../../utils/mocks/@nestjs/common/execution-context.mock';
import { HttpCacheInterceptor } from '../../interceptors/http-cache.interceptor';
import { CACHE_MANAGER } from '@nestjs/common';
import { mockedGetRequest } from '../../utils/mocks/@nestjs/common/arguments-host.mock';
import { mockedReflector } from '../../utils/mocks/@nestjs/core/reflector.mock';
import { Reflector } from '@nestjs/core';
import { mockedCacheManager } from '../../utils/mocks/@nestjs/common/cache-manager.mock';

describe(HttpCacheInterceptor.name, () => {
  const executionContext = mockedExecutionContext as any;

  let httpCacheInterceptor: HttpCacheInterceptor;
  let cacheManager: any;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        HttpCacheInterceptor,
        { provide: CACHE_MANAGER, useValue: mockedCacheManager },
        // * Since the reflector in constructor using @Inject keyword {@see https://github.com/nestjs/nest/blob/master/packages/common/cache/interceptors/cache.interceptor.ts}
        // * Then, provider here declared with provide a constant value named 'Reflector' as the origin cache.interceptor.ts used
        { provide: 'Reflector', useValue: mockedReflector },
      ],
    }).compile();

    httpCacheInterceptor =
      moduleRef.get<HttpCacheInterceptor>(HttpCacheInterceptor);
    cacheManager = moduleRef.get(CACHE_MANAGER);
    reflector = moduleRef.get('Reflector');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${HttpCacheInterceptor.prototype.intercept.name} is called`, () => {
    describe('and there is no request', () => {
      it('should return undefined', () => {
        mockedGetRequest.mockReturnValue(undefined);

        // * using [] bracket to access protected function
        expect(httpCacheInterceptor['trackBy'](executionContext)).toBe(
          undefined,
        );
      });
    });

    describe('and there is a request', () => {
      let reflectorGetSpy: jest.SpyInstance<any>;

      beforeEach(() => {
        mockedGetRequest.mockReturnValue({
          url: '/api/users',
          method: 'GET',
        });

        reflectorGetSpy = jest.spyOn(reflector, 'get');
      });

      describe('and the metadata to not to be cached is true', () => {
        beforeEach(() => {
          reflectorGetSpy.mockReturnValue(true);
        });

        it('should return to the next handle immediately', () => {
          expect(httpCacheInterceptor['trackBy'](executionContext)).toBe(
            undefined,
          );
        });
      });

      describe('and the metadata to not to be cached is other than true', () => {
        beforeEach(() => {
          reflectorGetSpy.mockReturnValueOnce(undefined);
        });

        describe('and the request is not came from http app', () => {
          beforeEach(() => {
            Object.defineProperty(httpCacheInterceptor, 'httpAdapterHost', {
              value: {
                httpAdapter: {},
              },
            });
          });

          describe('and the cacheMetaData is available', () => {
            beforeEach(() => {
              reflectorGetSpy.mockReturnValueOnce('cache_key_metadata');
            });

            it('should return the CACHE_KEY_METADATA', () => {
              expect(httpCacheInterceptor['trackBy'](executionContext)).toBe(
                'cache_key_metadata',
              );
            });
          });

          describe('and the cacheMetaData is not available', () => {
            beforeEach(() => {
              reflectorGetSpy.mockReturnValueOnce(undefined);
            });

            it('should return the CACHE_KEY_METADATA as well (undefined)', () => {
              expect(httpCacheInterceptor['trackBy'](executionContext)).toBe(
                undefined,
              );
            });
          });
        });

        describe('and the request is came from http app', () => {
          const mockedGetRequestMethod = jest.fn();
          const mockedGetRequestUrl = jest.fn();

          beforeEach(() => {
            Object.defineProperty(httpCacheInterceptor, 'httpAdapterHost', {
              value: {
                httpAdapter: {
                  getRequestMethod: mockedGetRequestMethod,
                  getRequestUrl: mockedGetRequestUrl,
                },
              },
            });
          });

          describe('and the cacheMetaData is available', () => {
            beforeEach(() => {
              reflectorGetSpy.mockReturnValue('cache_key_metadata');
            });

            it('should return the CACHE_KEY_METADATA', () => {
              expect(httpCacheInterceptor['trackBy'](executionContext)).toBe(
                'cache_key_metadata',
              );
            });
          });

          describe('and the cacheMetaData is not available', () => {
            beforeEach(() => {
              reflectorGetSpy.mockReturnValue(undefined);
            });

            describe('and the request method is not GET', () => {
              let cacheManagerDelSpy: jest.SpyInstance<any>;
              const cachedRoutes = new Map<string, any>([
                ['api/users', ['api/users?page=1']],
              ]);

              beforeEach(() => {
                mockedGetRequestMethod.mockReturnValue('POST');
                Object.defineProperty(httpCacheInterceptor, 'cachedRoutes', {
                  value: cachedRoutes,
                });
                cacheManagerDelSpy = jest.spyOn(cacheManager, 'del');
              });

              it('should call the cacheManager del method', () => {
                jest.useFakeTimers();

                httpCacheInterceptor['trackBy'](executionContext);

                jest.advanceTimersByTime(1);

                expect(cacheManagerDelSpy).toHaveBeenCalled();
              });

              it('should return undefined', () => {
                expect(httpCacheInterceptor['trackBy'](executionContext)).toBe(
                  undefined,
                );
              });
            });

            describe('and the request method is GET', () => {
              let originalKey: string;
              let splittedKey: string;

              const cachedRoutes = new Map<string, any>();

              beforeEach(() => {
                originalKey = 'api/users?page=1';
                splittedKey = originalKey.split('?')[0] ?? '';

                mockedGetRequestMethod.mockReturnValue('GET');
                mockedGetRequestUrl.mockReturnValue(originalKey);
              });

              describe('and the cachedRoutes has the key and the cachedRoutes key does not include the incoming url', () => {
                beforeEach(() => {
                  cachedRoutes.has = jest.fn().mockReturnValue(true);
                  cachedRoutes.set = jest
                    .fn()
                    .mockReturnValue(
                      new Map<string, any>([
                        [splittedKey, [`${splittedKey}?search=text`]],
                      ]),
                    );
                  cachedRoutes.get = jest.fn().mockReturnValue([]);

                  Object.defineProperty(httpCacheInterceptor, 'cachedRoutes', {
                    value: cachedRoutes,
                  });
                });

                it('should call the cachedRoutes set method with key and append the existing key', () => {
                  httpCacheInterceptor['trackBy'](executionContext);

                  expect(cachedRoutes.set).toBeCalledWith(splittedKey, [
                    ...cachedRoutes.get(splittedKey),
                    originalKey,
                  ]);
                });

                it('should return the incoming url', () => {
                  expect(
                    httpCacheInterceptor['trackBy'](executionContext),
                  ).toBe(originalKey);
                });
              });

              describe('and the cachedRoutes does not have the key and the cachedRoutes key does or does not include the incoming url', () => {
                beforeEach(() => {
                  cachedRoutes.has = jest.fn().mockReturnValue(false);
                  cachedRoutes.set = jest
                    .fn()
                    .mockReturnValue(
                      new Map<string, any>([
                        [splittedKey, [`${splittedKey}?search=text`]],
                      ]),
                    );
                  cachedRoutes.get = jest.fn().mockReturnValue([]);

                  Object.defineProperty(httpCacheInterceptor, 'cachedRoutes', {
                    value: cachedRoutes,
                  });
                });

                it('should call the cachedRoutes set method with key and the incoming url', () => {
                  httpCacheInterceptor['trackBy'](executionContext);

                  expect(cachedRoutes.set).toBeCalledWith(splittedKey, [
                    originalKey,
                  ]);
                });

                it('should return the incoming url', () => {
                  expect(
                    httpCacheInterceptor['trackBy'](executionContext),
                  ).toBe(originalKey);
                });
              });
            });
          });
        });
      });
    });
  });
});
