import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { userProfilesData } from '../../../database/data/user-profiles.data';
import { usersData } from '../../../database/data/users.data';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

describe(UsersService.name, () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${UsersService.prototype.create.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.create.mockReturnValue(usersData[0]);
    });

    it('should return the created user', async () => {
      expect(await usersService.create(usersData[0])).toBe(usersData[0]);
    });
  });

  describe(`when ${UsersService.prototype.findAll.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.find.mockResolvedValue(usersData);
    });

    it('should return array of users', async () => {
      expect(await usersService.findAll()).toStrictEqual(usersData);
    });
  });

  describe(`when ${UsersService.prototype.findById.name} is called`, () => {
    describe(`and the user is not found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(await usersService.findById(usersData[0].id)).toBeNull();
      });
    });

    describe(`and the user is found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(usersData[0]);
      });

      it('should return a user', async () => {
        expect(await usersService.findById(usersData[0].id)).toStrictEqual(
          usersData[0],
        );
      });
    });
  });

  describe(`when ${UsersService.prototype.findByUsername.name} is called`, () => {
    describe(`and the user is not found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(
          await usersService.findByUsername(usersData[0].username),
        ).toBeNull();
      });
    });

    describe(`and the user is found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(usersData[0]);
      });

      it('should return a user', async () => {
        expect(
          await usersService.findByUsername(usersData[0].username),
        ).toStrictEqual(usersData[0]);
      });
    });
  });

  describe(`when ${UsersService.prototype.findByEmail.name} is called`, () => {
    describe(`and the user is not found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(await usersService.findByEmail(usersData[0].email)).toBeNull();
      });
    });

    describe(`and the user is found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(usersData[0]);
      });

      it('should return a user', async () => {
        expect(
          await usersService.findByEmail(usersData[0].email),
        ).toStrictEqual(usersData[0]);
      });
    });
  });

  describe(`when ${UsersService.prototype.findByPhone.name} is called`, () => {
    describe(`and the user is not found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(await usersService.findByPhone(usersData[0].phone)).toBeNull();
      });
    });

    describe(`and the user is found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(usersData[0]);
      });

      it('should return a user', async () => {
        expect(
          await usersService.findByPhone(usersData[0].phone),
        ).toStrictEqual(usersData[0]);
      });
    });
  });

  describe(`when ${UsersService.prototype.update.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await usersService.update(usersData[0].id, usersData[0]),
      ).toBeTruthy();
    });
  });

  describe(`when ${UsersService.prototype.updatePassword.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await usersService.updatePassword(
          usersData[0].id,
          usersData[0].password,
        ),
      ).toBeTruthy();
    });
  });

  describe(`when ${UsersService.prototype.updateRoles.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await usersService.updateRoles(usersData[0].id, usersData[0].roles),
      ).toBeTruthy();
    });
  });

  describe(`when ${UsersService.prototype.updateProfile.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await usersService.updateProfile(usersData[0].id, userProfilesData[0]),
      ).toBeTruthy();
    });
  });

  describe(`when ${UsersService.prototype.delete.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.delete.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(await usersService.delete(usersData[0].id)).toBeTruthy();
    });
  });
});
