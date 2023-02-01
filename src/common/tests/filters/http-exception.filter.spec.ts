import { HttpStatus } from '@nestjs/common';
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
} from '../../utils/mocks/@nestjs/common/arguments-host.mock';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';
import { InternalServerErrorException } from '../../exceptions/internal-server-error.exception';
import { getLoggerToken } from 'nestjs-pino';
import { mockedPinoLogger } from '../../utils/mocks/nestjs-pino/pino-logger.mock';

const argumentsHost = mockedArgumentsHost as any;

describe('HttpExceptionFilter', () => {
  let httpExceptionFilter: HttpExceptionFilter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        HttpExceptionFilter,
        {
          provide: getLoggerToken(HttpExceptionFilter.name),
          useValue: mockedPinoLogger,
        },
      ],
    }).compile();

    httpExceptionFilter =
      moduleRef.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  describe('when catch is called', () => {
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

    let exception: any;

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

      exception = new UnprocessableEntityException({}, validationErrors);
    });

    describe('when the exception http status is other than >= 400 && <= 499', () => {
      beforeEach(() => {
        exception = new InternalServerErrorException();
      });

      it('should log the error exception', () => {
        httpExceptionFilter.catch(exception, argumentsHost);

        expect(mockedPinoLogger.error).toBeCalledWith(exception);
      });
    });

    describe('when the exception http status is >= 400 && <= 499', () => {
      it('should log the warn exception', () => {
        httpExceptionFilter.catch(exception, argumentsHost);

        expect(mockedPinoLogger.warn).toBeCalledWith(exception);
      });
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
