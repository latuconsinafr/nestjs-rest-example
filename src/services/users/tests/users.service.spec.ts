import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedLogger } from '../../../common/utils/mocks/logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/repository.mock';
import { usersData } from '../../../database/data/users.data';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let users: User[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PinoLogger,
          useValue: mockedLogger,
        },
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);

    users = [...usersData];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when create is called', () => {
    beforeEach(() => {
      mockedRepository.create.mockReturnValue(users[0]);
    });

    it('should return the created user', async () => {
      expect(await usersService.create(users[0])).toBe(users[0]);
    });
  });

  describe('when findAll is called', () => {
    beforeEach(() => {
      mockedRepository.find.mockResolvedValue(users);
    });

    it('should return array of users', async () => {
      expect(await usersService.findAll()).toStrictEqual(users);
    });
  });

  describe('when findById is called', () => {
    beforeEach(() => {
      mockedRepository.findOneBy.mockResolvedValue(users[0]);
    });

    it('should return a user', async () => {
      expect(await usersService.findById(users[0].id)).toStrictEqual(users[0]);
    });
  });

  describe('when update is called', () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(await usersService.update(users[0].id, users[0])).toBeTruthy();
    });
  });

  describe('when delete is called', () => {
    beforeEach(() => {
      mockedRepository.delete.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(await usersService.delete(users[0].id)).toBeTruthy();
    });
  });
});
