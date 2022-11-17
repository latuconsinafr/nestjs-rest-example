import { HttpStatus, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import { DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE } from '../../constants';
import { ErrorCode } from '../../enums/error-code.enum';
import { UnprocessableEntityException } from '../../exceptions/unprocessable-entity.exception';
import {
  mockedArgumentsHost,
  mockedGetRequest,
  mockedJson,
  mockedStatus,
} from '../../module-utils/utils/mocks/arguments-host.mock';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

describe('HttpExceptionFilter', () => {
  const argumentsHost = mockedArgumentsHost as any;

  let httpExceptionFilter: HttpExceptionFilter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    httpExceptionFilter =
      moduleRef.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  describe('when catch is called', () => {
    const loggerErrorSpy = jest.spyOn(Logger.prototype, 'error');
    const date = new Date(2020, 3, 1);
    const url = '/test';
    const validationErrors: ValidationError[] = [
      {
        target: {
          username: '',
          password: 'password',
          description: 'description',
        },
        value: '',
        property: 'username',
        children: [],
        constraints: {
          isLength: 'username must be longer than or equal to 5 characters',
          isNotEmpty: 'username should not be empty',
        },
      },
      {
        target: {
          username: '',
          password: 'password',
          description: 'description',
        },
        value: undefined,
        property: 'roles',
        children: [],
        constraints: {
          isEnum: 'each value in roles must be a valid enum value',
          isArray: 'roles must be an array',
          isNotEmpty: 'roles should not be empty',
        },
      },
    ];
    const exception = new UnprocessableEntityException({}, validationErrors);

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(date);

      mockedGetRequest.mockReturnValue({ url: url });
      mockedJson.mockReturnValue({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        timestamp: date.toISOString(),
        path: url,
        success: false,
        message: DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE,
      });
    });

    it('should log the exception', () => {
      httpExceptionFilter.catch(exception, argumentsHost);

      expect(loggerErrorSpy).toBeCalledWith(exception);
    });

    it('should call response status with the correct http status', () => {
      httpExceptionFilter.catch(exception, argumentsHost);

      expect(mockedStatus).toBeCalledWith(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should call response json with the correct response body', () => {
      httpExceptionFilter.catch(exception, argumentsHost);

      expect(mockedJson).toBeCalledWith({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        timestamp: date.toISOString(),
        path: url,
        success: false,
        error: ErrorCode.ErrorUnprocessableEntity,
        help: 'Help is not available',
        message: validationErrors.map((error) => ({
          property: error.property,
          constraints: error.constraints
            ? Object.values(error.constraints)
            : [],
        })),
      });
    });
  });
});
