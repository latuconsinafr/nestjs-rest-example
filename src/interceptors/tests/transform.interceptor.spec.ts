import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { TransformInterceptor } from '../transform.interceptor';
import { mockedCallHandler } from '../../common/utils/mocks/call-handler.mock';
import { mockedExecutionContext } from '../../common/utils/mocks/execution-context.mock';
import {
  mockedGetRequest,
  mockedGetResponse,
} from '../../common/utils/mocks/arguments-host.mock';

describe('TransformInterceptor', () => {
  const executionContext = mockedExecutionContext as any;
  const callHandler = mockedCallHandler as any;

  let transformInterceptor: TransformInterceptor<any>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TransformInterceptor],
    }).compile();

    transformInterceptor =
      moduleRef.get<TransformInterceptor<any>>(TransformInterceptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when intercept is called', () => {
    const toReturn = { message: 'Success', data: [] };
    const url = '/url';
    const httpStatusCode = 200;
    const date = new Date(2020, 3, 1);

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(date);

      mockedGetRequest.mockReturnValue({ url: url });
      mockedGetResponse.mockReturnValue({ statusCode: httpStatusCode });
      callHandler.handle.mockReturnValue(of(toReturn));
    });

    it('should call the callHandler handle method', (done: any) => {
      transformInterceptor.intercept(executionContext, callHandler).subscribe({
        next() {
          expect(callHandler.handle).toBeCalledTimes(1);
        },
        complete() {
          done();
        },
      });
    });

    it('should return the transformed value', (done: any) => {
      transformInterceptor.intercept(executionContext, callHandler).subscribe({
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
