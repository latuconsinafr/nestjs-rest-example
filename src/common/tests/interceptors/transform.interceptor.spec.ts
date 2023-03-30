import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { mockedCallHandler } from '../../utils/mocks/@nestjs/common/call-handler.mock';
import { mockedExecutionContext } from '../../utils/mocks/@nestjs/common/execution-context.mock';
import {
  mockedGetRequest,
  mockedGetResponse,
} from '../../utils/mocks/@nestjs/common/arguments-host.mock';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Reflector } from '@nestjs/core';
import { mockedReflector } from '../../utils/mocks/@nestjs/core/reflector.mock';

describe(TransformInterceptor.name, () => {
  const executionContext = mockedExecutionContext;
  const callHandler = mockedCallHandler;

  let transformInterceptor: TransformInterceptor<any>;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TransformInterceptor,
        { provide: Reflector, useValue: mockedReflector },
      ],
    }).compile();

    transformInterceptor =
      moduleRef.get<TransformInterceptor<any>>(TransformInterceptor);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${TransformInterceptor.prototype.intercept.name} is called`, () => {
    const toReturn = { message: 'Success', data: [] };
    const url = '/url';
    const httpStatusCode = 200;
    const date = new Date(2020, 3, 1);
    let reflectorGetSpy: jest.SpyInstance<any>;

    beforeEach(() => {
      reflectorGetSpy = jest.spyOn(reflector, 'get');
      callHandler.handle.mockReturnValue(of(toReturn));
    });

    describe('and the metadata to not to be transformed is true', () => {
      beforeEach(() => {
        reflectorGetSpy.mockReturnValue(true);
      });

      it('should return to the next handle immediately', (done: any) => {
        transformInterceptor
          .intercept(executionContext, callHandler)
          .subscribe({
            next() {
              expect(callHandler.handle).toBeCalledTimes(1);
            },
            complete() {
              done();
            },
          });
      });
    });

    describe('and the metadata to not to be transformed is other than true', () => {
      beforeEach(() => {
        reflectorGetSpy.mockReturnValue(undefined);
        jest.useFakeTimers();
        jest.setSystemTime(date);

        mockedGetRequest.mockReturnValue({ url: url });
        mockedGetResponse.mockReturnValue({ statusCode: httpStatusCode });
      });

      it('should call the callHandler handle method', (done: any) => {
        transformInterceptor
          .intercept(executionContext, callHandler)
          .subscribe({
            next() {
              expect(callHandler.handle).toBeCalledTimes(1);
            },
            complete() {
              done();
            },
          });
      });

      it('should return the transformed value', (done: any) => {
        transformInterceptor
          .intercept(executionContext, callHandler)
          .subscribe({
            next(value) {
              expect(value).toStrictEqual({
                statusCode: httpStatusCode,
                timestamp: date.toISOString(),
                path: url,
                success: true,
                message: 'Success',
                data: [],
              });
            },
            complete() {
              done();
            },
          });
      });
    });
  });
});
