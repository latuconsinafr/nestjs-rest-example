import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { v4 as uuidv4 } from 'uuid';
import { ValidationArguments } from 'class-validator';
import { RolesService } from '../../roles.service';
import { rolesData } from '../../../../database/data/roles.data';
import { Role } from '../../entities/role.entity';
import { IsRoleExistByNameValidator } from '../../validators/is-role-exist-by-name.validator';
import { UserRole } from '../../enums/user-role.enum';

describe(IsRoleExistByNameValidator.name, () => {
  let isRoleExistByNameValidator: IsRoleExistByNameValidator;
  let rolesService: RolesService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsRoleExistByNameValidator,
        RolesService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Role), useValue: mockedRepository },
      ],
    }).compile();

    isRoleExistByNameValidator = moduleRef.get<IsRoleExistByNameValidator>(
      IsRoleExistByNameValidator,
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

  describe(`when ${IsRoleExistByNameValidator.prototype.validate.name} is called`, () => {
    let value: UserRole;

    beforeEach(() => {
      value = UserRole.SuperAdmin;
    });

    describe('and the role is not found', () => {
      it('should return false', async () => {
        jest.spyOn(rolesService, 'findByName').mockResolvedValue(null);

        expect(await isRoleExistByNameValidator.validate(value)).toBeFalsy();
      });
    });

    describe('and the role is found', () => {
      it('should return true', async () => {
        jest.spyOn(rolesService, 'findByName').mockResolvedValue(rolesData[0]);

        expect(await isRoleExistByNameValidator.validate(value)).toBeTruthy();
      });
    });
  });

  describe(`when ${IsRoleExistByNameValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isRoleExistByNameValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `role with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`,
      );
    });
  });
});
