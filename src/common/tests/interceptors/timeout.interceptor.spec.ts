import { Test } from '@nestjs/testing';
import { mockedExecutionContext } from '../../module-utils/utils/mocks/execution-context.mock';
import { mockedCallHandler } from '../../module-utils/utils/mocks/call-handler.mock';
import { delay, EmptyError, of, throwError } from 'rxjs';
import { APP_MAX_TIMEOUT } from '../../constants';
import { RequestTimeoutException } from '../../exceptions/request-timeout.exception';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';

describe('TimeoutInterceptor', () => {
  const executionContext = mockedExecutionContext as any;
  const callHandler = mockedCallHandler as any;

  let timeoutInterceptor: TimeoutInterceptor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TimeoutInterceptor],
    }).compile();

    timeoutInterceptor = moduleRef.get<TimeoutInterceptor>(TimeoutInterceptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when intercept is called', () => {
    const returnedValue: [] = [];

    describe('and there is no error thrown', () => {
      it(`should return the to be returned value`, (done: any) => {
        callHandler.handle.mockReturnValue(of(returnedValue));

        timeoutInterceptor.intercept(executionContext, callHandler).subscribe({
          next(value) {
            expect(value).toStrictEqual(returnedValue);
          },
          complete() {
            done();
          },
        });
      });
    });

    describe('and there is an error thrown', () => {
      describe('and the error caused by request timeout', () => {
        it(`should throw ${RequestTimeoutException.name}`, (done: any) => {
          callHandler.handle.mockReturnValue(
            of(returnedValue).pipe(delay(APP_MAX_TIMEOUT + 1000)),
          );

          timeoutInterceptor
            .intercept(executionContext, callHandler)
            .subscribe({
              error(err) {
                expect(err).toBeInstanceOf(RequestTimeoutException);
                done();
              },
              complete() {
                done();
              },
            });
        });
      });

      describe('and the error caused by error other than timeout', () => {
        it('should throw the error', (done: any) => {
          callHandler.handle.mockImplementation(() => {
            return throwError(EmptyError);
          });

          timeoutInterceptor
            .intercept(executionContext, callHandler)
            .subscribe({
              error(err) {
                expect(err).toBeInstanceOf(TypeError);
                done();
              },
              complete() {
                done();
              },
            });
        });
      });
    });
  });
});
