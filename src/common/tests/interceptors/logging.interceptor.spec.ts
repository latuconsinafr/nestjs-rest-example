import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { mockedCallHandler } from '../../utils/mocks/call-handler.mock';
import { mockedExecutionContext } from '../../utils/mocks/execution-context.mock';
import { mockedGetRequest } from '../../utils/mocks/arguments-host.mock';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { getLoggerToken } from 'nestjs-pino';
import { mockedLogger } from '../../utils/mocks/logger.mock';

describe('LoggingInterceptor', () => {
  const executionContext = mockedExecutionContext as any;
  const callHandler = mockedCallHandler as any;

  let loggingInterceptor: LoggingInterceptor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LoggingInterceptor,
        {
          provide: getLoggerToken(LoggingInterceptor.name),
          useValue: mockedLogger,
        },
      ],
    }).compile();

    loggingInterceptor = moduleRef.get<LoggingInterceptor>(LoggingInterceptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when intercept is called', () => {
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

      expect(mockedLogger.log).toBeCalledWith(`Start hitting ${url}...`);
    });

    it(`should logging 3 times: Initialized, Start hitting and After`, (done: any) => {
      loggingInterceptor.intercept(executionContext, callHandler).subscribe({
        complete() {
          done();

          expect(mockedLogger.log).toBeCalledTimes(2);
        },
      });
    });
  });
});
