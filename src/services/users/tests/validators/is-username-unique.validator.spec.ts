import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users.service';
import { ValidationArguments } from 'class-validator';
import { usersData } from '../../../../database/data/users.data';
import { IsUsernameUniqueValidator } from '../../validators/is-username-unique.validator';

describe(IsUsernameUniqueValidator.name, () => {
  let isUsernameUniqueValidator: IsUsernameUniqueValidator;
  let usersService: UsersService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsUsernameUniqueValidator,
        UsersService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    isUsernameUniqueValidator = moduleRef.get<IsUsernameUniqueValidator>(
      IsUsernameUniqueValidator,
    );
    usersService = moduleRef.get<UsersService>(UsersService);

    validationArguments = {
      property: 'username',
      value: 'user',
      targetName: 'username',
      constraints: [],
      object: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${IsUsernameUniqueValidator.prototype.validate.name} is called`, () => {
    describe('and the user is not found', () => {
      it('should return true', async () => {
        jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);

        expect(
          await isUsernameUniqueValidator.validate(usersData[0].username),
        ).toBeTruthy();
      });
    });

    describe('and the user is found', () => {
      beforeEach(() => {
        jest
          .spyOn(usersService, 'findByUsername')
          .mockResolvedValue(usersData[0]);
      });

      describe('and the identifier key is not provided', () => {
        it('should return false', async () => {
          expect(
            await isUsernameUniqueValidator.validate(
              usersData[0].username,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the object is not provided', () => {
        it('should return false', async () => {
          expect(
            await isUsernameUniqueValidator.validate(
              usersData[0].username,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the identifier key is provided', () => {
        beforeEach(() => {
          validationArguments.constraints = ['username'];
        });

        describe('and the object is provided', () => {
          describe('and the value of object of identifier key is not equal with the value of user of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { username: usersData[1].username };
            });

            it('should return false', async () => {
              expect(
                await isUsernameUniqueValidator.validate(
                  usersData[0].username,
                  validationArguments,
                ),
              ).toBeFalsy();
            });
          });

          describe('and the value of object of identifier key is equal with the value of user of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { username: usersData[0].username };
            });

            it('should return true', async () => {
              expect(
                await isUsernameUniqueValidator.validate(
                  usersData[0].username,
                  validationArguments,
                ),
              ).toBeTruthy();
            });
          });
        });
      });
    });
  });

  describe(`when ${IsUsernameUniqueValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isUsernameUniqueValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `user with ${validationArguments?.property} ${validationArguments?.value} already exists`,
      );
    });
  });
});
