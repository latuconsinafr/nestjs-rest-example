import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { LoggingInterceptor } from '../logging.interceptor';
import { mockedCallHandler } from '../../common/utils/mocks/call-handler.mock';
import { mockedExecutionContext } from '../../common/utils/mocks/execution-context.mock';
import { mockedGetRequest } from '../../common/utils/mocks/arguments-host.mock';

describe('LoggingInterceptor', () => {
  const executionContext = mockedExecutionContext as any;
  const callHandler = mockedCallHandler as any;

  let loggingInterceptor: LoggingInterceptor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LoggingInterceptor],
    }).compile();

    loggingInterceptor = moduleRef.get<LoggingInterceptor>(LoggingInterceptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when intercept is called', () => {
    const loggerLogSpy = jest.spyOn(Logger.prototype, 'log');
    const url = '/test';

    beforeEach(() => {
      mockedGetRequest.mockReturnValue({ url: url });
      callHandler.handle.mockReturnValue(of({}));
    });

    it(`should logging "Start hitting" with right url`, (done: any) => {
      loggingInterceptor.intercept(executionContext, callHandler).subscribe({
        complete() {
          done();
        },
      });

      expect(loggerLogSpy).toBeCalledWith(`Start hitting ${url}...`);
    });

    it(`should logging 3 times: Initialized, Start hitting and After`, (done: any) => {
      loggingInterceptor.intercept(executionContext, callHandler).subscribe({
        complete() {
          done();

          expect(loggerLogSpy).toBeCalledWith(
            'RootTestModule dependencies initialized',
          );
          expect(loggerLogSpy).toBeCalledWith(`Start hitting ${url}...`);
          expect(loggerLogSpy).toBeCalledWith(`After... ${0}ms`);
          expect(loggerLogSpy).toBeCalledTimes(3);
        },
      });
    });
  });
});
