import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { mockedCallHandler } from '../../utils/mocks/@nestjs/common/call-handler.mock';
import { mockedExecutionContext } from '../../utils/mocks/@nestjs/common/execution-context.mock';
import { mockedGetRequest } from '../../utils/mocks/@nestjs/common/arguments-host.mock';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { getLoggerToken } from 'nestjs-pino';
import { mockedPinoLogger } from '../../utils/mocks/nestjs-pino/pino-logger.mock';

describe(LoggingInterceptor.name, () => {
  const executionContext = mockedExecutionContext as any;
  const callHandler = mockedCallHandler as any;

  let loggingInterceptor: LoggingInterceptor;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LoggingInterceptor,
        {
          provide: getLoggerToken(LoggingInterceptor.name),
          useValue: mockedPinoLogger,
        },
      ],
    }).compile();

    loggingInterceptor = moduleRef.get<LoggingInterceptor>(LoggingInterceptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${LoggingInterceptor.prototype.intercept.name} is called`, () => {
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

      expect(mockedPinoLogger.log).toBeCalledWith(`Start hitting ${url}...`);
    });

    it(`should logging 3 times: Initialized, Start hitting and After`, (done: any) => {
      loggingInterceptor.intercept(executionContext, callHandler).subscribe({
        complete() {
          done();

          expect(mockedPinoLogger.log).toBeCalledTimes(2);
        },
      });
    });
  });
});
