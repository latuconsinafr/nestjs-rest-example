import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users.service';
import { IsEmailUniqueValidator } from '../../validators/is-email-unique-validator';
import { ValidationArguments } from 'class-validator';
import { usersData } from '../../../../database/data/users.data';

describe(IsEmailUniqueValidator.name, () => {
  let isEmailUniqueValidator: IsEmailUniqueValidator;
  let usersService: UsersService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsEmailUniqueValidator,
        UsersService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    isEmailUniqueValidator = moduleRef.get<IsEmailUniqueValidator>(
      IsEmailUniqueValidator,
    );
    usersService = moduleRef.get<UsersService>(UsersService);

    validationArguments = {
      property: 'email',
      value: 'mail@mail.com',
      targetName: 'email',
      constraints: [],
      object: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${IsEmailUniqueValidator.prototype.validate.name} is called`, () => {
    describe('and the user is not found', () => {
      it('should return true', async () => {
        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

        expect(
          await isEmailUniqueValidator.validate(usersData[0].email),
        ).toBeTruthy();
      });
    });

    describe('and the user is found', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(usersData[0]);
      });

      describe('and the identifier key is not provided', () => {
        it('should return false', async () => {
          expect(
            await isEmailUniqueValidator.validate(
              usersData[0].email,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the object is not provided', () => {
        it('should return false', async () => {
          expect(
            await isEmailUniqueValidator.validate(
              usersData[0].email,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the identifier key is provided', () => {
        beforeEach(() => {
          validationArguments.constraints = ['email'];
        });

        describe('and the object is provided', () => {
          describe('and the value of object of identifier key is not equal with the value of user of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { email: usersData[1].email };
            });

            it('should return false', async () => {
              expect(
                await isEmailUniqueValidator.validate(
                  usersData[0].email,
                  validationArguments,
                ),
              ).toBeFalsy();
            });
          });

          describe('and the value of object of identifier key is equal with the value of user of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { email: usersData[0].email };
            });

            it('should return true', async () => {
              expect(
                await isEmailUniqueValidator.validate(
                  usersData[0].email,
                  validationArguments,
                ),
              ).toBeTruthy();
            });
          });
        });
      });
    });
  });

  describe(`when ${IsEmailUniqueValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isEmailUniqueValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `user with ${validationArguments?.property} ${validationArguments?.value} already exists`,
      );
    });
  });
});
