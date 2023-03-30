import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users.service';
import { ValidationArguments } from 'class-validator';
import { usersData } from '../../../../database/data/users.data';
import { IsPhoneNumberUniqueValidator } from '../../validators/is-phone-number-unique.validator';

describe(IsPhoneNumberUniqueValidator.name, () => {
  let isPhoneNumberUniqueValidator: IsPhoneNumberUniqueValidator;
  let usersService: UsersService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsPhoneNumberUniqueValidator,
        UsersService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    isPhoneNumberUniqueValidator = moduleRef.get<IsPhoneNumberUniqueValidator>(
      IsPhoneNumberUniqueValidator,
    );
    usersService = moduleRef.get<UsersService>(UsersService);

    validationArguments = {
      property: 'phone',
      value: '+6282246924950',
      targetName: 'phone',
      constraints: [],
      object: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${IsPhoneNumberUniqueValidator.prototype.validate.name} is called`, () => {
    describe('and the user is not found', () => {
      it('should return true', async () => {
        jest.spyOn(usersService, 'findByPhone').mockResolvedValue(null);

        expect(
          await isPhoneNumberUniqueValidator.validate(usersData[0].phone),
        ).toBeTruthy();
      });
    });

    describe('and the user is found', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'findByPhone').mockResolvedValue(usersData[0]);
      });

      describe('and the identifier key is not provided', () => {
        it('should return false', async () => {
          expect(
            await isPhoneNumberUniqueValidator.validate(
              usersData[0].phone,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the object is not provided', () => {
        it('should return false', async () => {
          expect(
            await isPhoneNumberUniqueValidator.validate(
              usersData[0].phone,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the identifier key is provided', () => {
        beforeEach(() => {
          validationArguments.constraints = ['phone'];
        });

        describe('and the object is provided', () => {
          describe('and the value of object of identifier key is not equal with the value of user of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { phone: usersData[1].phone };
            });

            it('should return false', async () => {
              expect(
                await isPhoneNumberUniqueValidator.validate(
                  usersData[0].phone,
                  validationArguments,
                ),
              ).toBeFalsy();
            });
          });

          describe('and the value of object of identifier key is equal with the value of user of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { phone: usersData[0].phone };
            });

            it('should return true', async () => {
              expect(
                await isPhoneNumberUniqueValidator.validate(
                  usersData[0].phone,
                  validationArguments,
                ),
              ).toBeTruthy();
            });
          });
        });
      });
    });
  });

  describe(`when ${IsPhoneNumberUniqueValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isPhoneNumberUniqueValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `user with ${validationArguments?.property} ${validationArguments?.value} already exists`,
      );
    });
  });
});
