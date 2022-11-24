import { Logger } from '@nestjs/common';
import { loggerMiddleware } from '../../middlewares/logger.middleware';

describe('when loggerMiddleware is called', () => {
  const method = 'GET';
  const originalUrl = '/api/v1/users';
  let statusCode = 200;
  let statusMessage = 'OK';

  const loggerErrorSpy = jest.spyOn(Logger.prototype, 'error');
  const loggerWarnSpy = jest.spyOn(Logger.prototype, 'warn');
  const loggerLogSpy = jest.spyOn(Logger.prototype, 'log');

  const request: any = {
    method: jest.fn(),
    originalUrl: jest.fn(),
  };
  const response: any = {
    statusCode: jest.fn(),
    statusMessage: jest.fn(),
    on: jest.fn().mockImplementation((event, handler) => handler()),
  };
  const next: any = jest.fn();

  beforeEach(() => {
    request.method = method;
    request.originalUrl = originalUrl;

    response.statusCode = statusCode;
    response.statusMessage = statusMessage;

    loggerErrorSpy.mockImplementation(() => undefined); // * to prevent logging in unit test
    loggerWarnSpy.mockImplementation(() => undefined); // * to prevent logging in unit test
    loggerLogSpy.mockImplementation(() => undefined); // * to prevent logging in unit test
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when the statusCode is above 499', () => {
    beforeEach(() => {
      statusCode = 500;
      statusMessage = 'Internal Server Error';

      response.statusCode = statusCode;
      response.statusMessage = statusMessage;
    });

    it('should call the logger error', () => {
      loggerMiddleware(request, response, next);

      expect(loggerErrorSpy).toBeCalled();
    });

    it('should call the logger error with message', () => {
      loggerMiddleware(request, response, next);

      expect(loggerErrorSpy).toBeCalledWith(
        `${method} ${originalUrl} ${statusCode} ${statusMessage}`,
      );
    });
  });

  describe('when the statusCode is above 399', () => {
    beforeEach(() => {
      statusCode = 404;
      statusMessage = 'Not Found';

      response.statusCode = statusCode;
      response.statusMessage = statusMessage;
    });

    it('should call the logger error', () => {
      loggerMiddleware(request, response, next);

      expect(loggerWarnSpy).toBeCalled();
    });

    it('should call the logger error with message', () => {
      loggerMiddleware(request, response, next);

      expect(loggerWarnSpy).toBeCalledWith(
        `${method} ${originalUrl} ${statusCode} ${statusMessage}`,
      );
    });
  });

  describe('when the statusCode is above under 400', () => {
    beforeEach(() => {
      statusCode = 304;
      statusMessage = 'Not Modified';

      response.statusCode = statusCode;
      response.statusMessage = statusMessage;
    });

    it('should call the logger error', () => {
      loggerMiddleware(request, response, next);

      expect(loggerLogSpy).toBeCalled();
    });

    it('should call the logger error with message', () => {
      loggerMiddleware(request, response, next);

      expect(loggerLogSpy).toBeCalledWith(
        `${method} ${originalUrl} ${statusCode} ${statusMessage}`,
      );
    });
  });

  it('should call the next method', () => {
    loggerMiddleware(request, response, next);

    expect(next).toBeCalledTimes(1);
  });
});
