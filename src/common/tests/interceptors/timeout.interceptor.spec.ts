import { Test } from '@nestjs/testing';
import { mockedExecutionContext } from '../../utils/mocks/@nestjs/common/execution-context.mock';
import { mockedCallHandler } from '../../utils/mocks/@nestjs/common/call-handler.mock';
import { delay, EmptyError, of, throwError } from 'rxjs';
import { APP_MAX_TIMEOUT } from '../../constants';
import { RequestTimeoutException } from '../../exceptions/request-timeout.exception';
import { TimeoutInterceptor } from '../../interceptors/timeout.interceptor';
import { Reflector } from '@nestjs/core';
import { mockedReflector } from '../../utils/mocks/@nestjs/core/reflector.mock';

describe(TimeoutInterceptor.name, () => {
  const executionContext = mockedExecutionContext;
  const callHandler = mockedCallHandler;

  let timeoutInterceptor: TimeoutInterceptor;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TimeoutInterceptor,
        { provide: Reflector, useValue: mockedReflector },
      ],
    }).compile();

    timeoutInterceptor = moduleRef.get<TimeoutInterceptor>(TimeoutInterceptor);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${TimeoutInterceptor.prototype.intercept.name} is called`, () => {
    const returnedValue: [] = [];
    let reflectorGetSpy: jest.SpyInstance<any>;

    beforeEach(() => {
      reflectorGetSpy = jest.spyOn(reflector, 'get');
    });

    describe('and the metadata to not to be timeouted is true', () => {
      beforeEach(() => {
        reflectorGetSpy.mockReturnValue(true);
      });

      it('should return to the next handle immediately', (done: any) => {
        callHandler.handle.mockReturnValue(of(returnedValue));

        timeoutInterceptor.intercept(executionContext, callHandler).subscribe({
          complete() {
            done();
          },
        });

        expect(callHandler.handle).toBeCalledTimes(1);
      });
    });

    describe('and the metadata to not to be timeouted is other than true', () => {
      beforeEach(() => {
        reflectorGetSpy.mockReturnValue(undefined);
      });

      describe('and there is no error thrown', () => {
        it(`should return the to be returned value`, (done: any) => {
          callHandler.handle.mockReturnValue(of(returnedValue));

          timeoutInterceptor
            .intercept(executionContext, callHandler)
            .subscribe({
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
});
