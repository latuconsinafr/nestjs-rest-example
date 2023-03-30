import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users.service';
import { IsUserExistValidator } from '../../validators/is-user-exist.validator';
import { v4 as uuidv4 } from 'uuid';
import { usersData } from '../../../../database/data/users.data';
import { ValidationArguments } from 'class-validator';

describe(IsUserExistValidator.name, () => {
  let isUserExistValidator: IsUserExistValidator;
  let usersService: UsersService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsUserExistValidator,
        UsersService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    isUserExistValidator =
      moduleRef.get<IsUserExistValidator>(IsUserExistValidator);
    usersService = moduleRef.get<UsersService>(UsersService);
    validationArguments = {
      property: 'id',
      value: uuidv4(),
      targetName: 'id',
      constraints: [],
      object: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${IsUserExistValidator.prototype.validate.name} is called`, () => {
    describe('and the incoming value is not a valid UUID v4', () => {
      it('should return false', async () => {
        expect(await isUserExistValidator.validate('asdasd')).toBeFalsy();
      });
    });

    describe('and the incoming value is a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the user is not found', () => {
        it('should return false', async () => {
          jest.spyOn(usersService, 'findById').mockResolvedValue(null);

          expect(await isUserExistValidator.validate(value)).toBeFalsy();
        });
      });

      describe('and the user is found', () => {
        it('should return true', async () => {
          jest.spyOn(usersService, 'findById').mockResolvedValue(usersData[0]);

          expect(await isUserExistValidator.validate(value)).toBeTruthy();
        });
      });
    });
  });

  describe(`when ${IsUserExistValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isUserExistValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `user with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`,
      );
    });
  });
});
