import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';
import { mockedCallHandler } from '../../module-utils/utils/mocks/call-handler.mock';
import { mockedExecutionContext } from '../../module-utils/utils/mocks/execution-context.mock';

describe('CacheInterceptor', () => {
  const executionContext = mockedExecutionContext as any;
  const callHandler = mockedCallHandler as any;

  let cacheInterceptor: CacheInterceptor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CacheInterceptor],
    }).compile();

    cacheInterceptor = moduleRef.get<CacheInterceptor>(CacheInterceptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when intercept is called', () => {
    const isCachedSpy = jest.spyOn(
      CacheInterceptor.prototype as any,
      'isCached',
    );

    describe('and the isCached is true', () => {
      beforeEach(() => {
        isCachedSpy.mockReturnValueOnce(true);
      });

      it('should return observable of undefined', (done: any) => {
        cacheInterceptor.intercept(executionContext, callHandler).subscribe({
          next(data) {
            expect(data).toStrictEqual([]);
          },
          complete() {
            done();
          },
        });
      });
    });

    describe('and the isCached is false', () => {
      const toReturn = { message: 'Success', data: null };

      beforeEach(() => {
        callHandler.handle.mockReturnValue(of(toReturn));
      });

      it('should call the callHandler handle method', (done: any) => {
        cacheInterceptor.intercept(executionContext, callHandler).subscribe({
          next() {
            expect(callHandler.handle).toBeCalledTimes(1);
          },
          complete() {
            done();
          },
        });
      });

      it('should return an the same value, since the interceptor does not do anything', (done: any) => {
        cacheInterceptor.intercept(executionContext, callHandler).subscribe({
          next(value) {
            expect(value).toStrictEqual(toReturn);
          },
          complete() {
            done();
          },
        });
      });
    });
  });
});
