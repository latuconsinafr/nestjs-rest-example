import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { v4 as uuidv4 } from 'uuid';
import { ValidationArguments } from 'class-validator';
import { RolesService } from '../../roles.service';
import { IsRoleExistByIdValidator } from '../../validators/is-role-exist-by-id.validator';
import { rolesData } from '../../../../database/data/roles.data';
import { Role } from '../../entities/role.entity';

describe(IsRoleExistByIdValidator.name, () => {
  let isRoleExistByIdValidator: IsRoleExistByIdValidator;
  let rolesService: RolesService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsRoleExistByIdValidator,
        RolesService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Role), useValue: mockedRepository },
      ],
    }).compile();

    isRoleExistByIdValidator = moduleRef.get<IsRoleExistByIdValidator>(
      IsRoleExistByIdValidator,
    );
    rolesService = moduleRef.get<RolesService>(RolesService);
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

  describe(`when ${IsRoleExistByIdValidator.prototype.validate.name} is called`, () => {
    describe('and the incoming value is not a valid UUID v4', () => {
      it('should return false', async () => {
        expect(await isRoleExistByIdValidator.validate('asdasd')).toBeFalsy();
      });
    });

    describe('and the incoming value is a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the role is not found', () => {
        it('should return false', async () => {
          jest.spyOn(rolesService, 'findById').mockResolvedValue(null);

          expect(await isRoleExistByIdValidator.validate(value)).toBeFalsy();
        });
      });

      describe('and the role is found', () => {
        it('should return true', async () => {
          jest.spyOn(rolesService, 'findById').mockResolvedValue(rolesData[0]);

          expect(await isRoleExistByIdValidator.validate(value)).toBeTruthy();
        });
      });
    });
  });

  describe(`when ${IsRoleExistByIdValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isRoleExistByIdValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `role with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`,
      );
    });
  });
});
