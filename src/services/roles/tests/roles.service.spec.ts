import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { rolesData } from '../../../database/data/roles.data';
import { Role } from '../entities/role.entity';
import { RolesService } from '../roles.service';

describe(RolesService.name, () => {
  let rolesService: RolesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Role), useValue: mockedRepository },
      ],
    }).compile();

    rolesService = moduleRef.get<RolesService>(RolesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${RolesService.prototype.findById.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.findOne.mockReturnValue(rolesData[0]);
    });

    it('should return the role', async () => {
      expect(await rolesService.findById(rolesData[0].id)).toBe(rolesData[0]);
    });
  });

  describe(`when ${RolesService.prototype.findByName.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.findOne.mockResolvedValue(rolesData[0]);
    });

    it('should return a local file', async () => {
      expect(await rolesService.findByName(rolesData[0].name)).toStrictEqual(
        rolesData[0],
      );
    });
  });

  describe(`when ${RolesService.prototype.findByNames.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.find.mockResolvedValue(rolesData);
    });

    it('should return true', async () => {
      expect(
        await rolesService.findByNames(rolesData.map((role) => role.name)),
      ).toBeTruthy();
    });
  });
});
