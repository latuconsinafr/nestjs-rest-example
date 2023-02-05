import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { SuccessResponseDto } from '../../../common/dto/responses/success-response.dto';
import { FileGeneralAccess } from '../../storages/enums/file-general-access.enum';
import { ConflictException } from '../../../common/exceptions/conflict.exception';
import { InternalServerErrorException } from '../../../common/exceptions/internal-server-error.exception';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { userProfilesData } from '../../../database/data/user-profiles.data';
import { usersData } from '../../../database/data/users.data';
import { LocalFile } from '../../storages/entities/local-file.entity';
import { StoragesService } from '../../storages/storages.service';
import { UpdateUserProfileRequest } from '../dto/requests/user-profiles/update-user-profile-request.dto';
import { CreateUserRequest } from '../dto/requests/users/create-user-request.dto';
import { UpdateUserRequest } from '../dto/requests/users/update-user-request.dto';
import { UserProfile } from '../entities/user-profile.entity';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let storagesService: StoragesService;
  let users: User[];
  let userProfiles: UserProfile[];
  let userProfileAvatar: Express.Multer.File;
  let userProfileAvatarLocalFile: LocalFile;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockedRepository },
        {
          provide: getRepositoryToken(UserProfile),
          useValue: mockedRepository,
        },
        StoragesService,
        {
          provide: getRepositoryToken(LocalFile),
          useValue: mockedRepository,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return {
                dest: './uploads',
              };
            }),
          },
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    storagesService = moduleRef.get<StoragesService>(StoragesService);
    usersController = moduleRef.get<UsersController>(UsersController);

    users = [...usersData];
    userProfiles = [...userProfilesData];
    userProfileAvatar = {
      fieldname: 'avatar',
      originalname: 'avatar.jpg',
      encoding: 'base64',
      mimetype: 'image/jpg',
      buffer: Buffer.from('test'),
      size: 51828,
    } as Express.Multer.File;
    userProfileAvatarLocalFile = {
      id: 1,
      fileName: userProfileAvatar.originalname,
      path: '/users/profiles/avatars',
      mimeType: userProfileAvatar.mimetype,
      generalAccess: FileGeneralAccess.Public,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when createUser is called', () => {
    let usersServiceCreateSpy: jest.SpyInstance<Promise<User>, [user: User]>;
    let userToCreate: CreateUserRequest;

    beforeEach(() => {
      usersServiceCreateSpy = jest.spyOn(usersService, 'create');
      usersServiceCreateSpy.mockResolvedValue(users[0]);
      userToCreate = { ...users[0] };
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'create').mockImplementation(async () => {
          throw new Error();
        });

        await expect(usersController.createUser(userToCreate)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    it(`should call ${UsersService.name} create method`, async () => {
      await usersController.createUser(userToCreate);

      expect(usersServiceCreateSpy).toBeCalledTimes(1);
    });

    it('should return the created user', async () => {
      expect(await usersController.createUser(userToCreate)).toStrictEqual(
        new SuccessResponseDto({
          message: 'User created',
          data: users[0],
        }),
      );
    });
  });

  describe('when findAllUsers is called', () => {
    let usersServiceFindAllSpy: jest.SpyInstance<Promise<User[]>, []>;

    beforeEach(() => {
      usersServiceFindAllSpy = jest.spyOn(usersService, 'findAll');
      usersServiceFindAllSpy.mockResolvedValue(users);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'findAll').mockImplementation(async () => {
          throw new Error();
        });

        await expect(usersController.findAllUsers()).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    it(`should call ${UsersService.name} findAll method`, async () => {
      await usersController.findAllUsers();

      expect(usersServiceFindAllSpy).toBeCalledTimes(1);
    });

    it(`should return a ${SuccessResponseDto.name} with message and data contains array of users`, async () => {
      expect(await usersController.findAllUsers()).toStrictEqual(
        new SuccessResponseDto({
          message: 'Users retrieved',
          data: users,
        }),
      );
    });
  });

  describe('when findUserById is called', () => {
    it(`should return a ${SuccessResponseDto.name} with message and data contains user`, async () => {
      expect(await usersController.findUserById(users[0])).toStrictEqual(
        new SuccessResponseDto({
          message: 'User retrieved',
          data: users[0],
        }),
      );
    });
  });

  describe('when updateUser is called', () => {
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: number, user: User]
    >;
    let userToUpdate: UpdateUserRequest;

    beforeEach(() => {
      usersServiceUpdateSpy = jest.spyOn(usersService, 'update');
      usersServiceUpdateSpy.mockResolvedValue(true);
      userToUpdate = { ...users[0] };
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUser(
            {
              ...users[0],
              id: users[0].id + 1,
              profile: {
                ...userProfiles[0],
                fullName: userProfiles[0].fullName,
              },
            },
            userToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'update').mockImplementation(async () => {
          throw new Error();
        });

        await expect(
          usersController.updateUser(users[0], userToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and the given user id between param and body are match', () => {
      it(`should return a ${SuccessResponseDto.name} with message`, async () => {
        expect(
          await usersController.updateUser(users[0], userToUpdate),
        ).toStrictEqual(
          new SuccessResponseDto({
            message: 'User updated',
          }),
        );
      });
    });
  });

  describe('when deleteUser is called', () => {
    let usersServiceDeleteSpy: jest.SpyInstance<Promise<boolean>, [id: number]>;

    beforeEach(() => {
      usersServiceDeleteSpy = jest.spyOn(usersService, 'delete');
      usersServiceDeleteSpy.mockResolvedValue(true);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'delete').mockImplementation(async () => {
          throw new Error();
        });

        await expect(usersController.deleteUser(users[0])).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    it(`should return a ${SuccessResponseDto.name} with message`, async () => {
      expect(await usersController.deleteUser(users[0])).toStrictEqual(
        new SuccessResponseDto({
          message: 'User deleted',
        }),
      );
    });
  });

  describe('when updateUserProfile is called', () => {
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: number, userProfile: UserProfile]
    >;
    let userProfileToUpdate: UpdateUserProfileRequest;

    beforeEach(() => {
      usersServiceUpdateSpy = jest.spyOn(usersService, 'updateProfile');
      usersServiceUpdateSpy.mockResolvedValue(true);
      userProfileToUpdate = { ...userProfiles[0] };
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUserProfile(
            {
              ...users[0],
              id: users[0].id + 1,
              profile: {
                ...userProfiles[0],
                fullName: userProfiles[0].fullName,
              },
            },
            userProfileToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest
          .spyOn(usersService, 'updateProfile')
          .mockImplementation(async () => {
            throw new Error();
          });

        await expect(
          usersController.updateUserProfile(users[0], userProfileToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and the given user id between param and body are match', () => {
      it(`should return a ${SuccessResponseDto.name} with message`, async () => {
        expect(
          await usersController.updateUserProfile(
            users[0],
            userProfileToUpdate,
          ),
        ).toStrictEqual(
          new SuccessResponseDto({
            message: 'User profile updated',
          }),
        );
      });
    });
  });

  describe('when updateUserProfileAvatar is called', () => {
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: number, userProfile: UserProfile]
    >;
    let userProfileToUpdate: UpdateUserProfileRequest;

    beforeEach(() => {
      usersServiceUpdateSpy = jest.spyOn(usersService, 'updateProfile');
      usersServiceUpdateSpy.mockResolvedValue(true);
      userProfileToUpdate = { ...userProfiles[0] };
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUserProfileAvatar(
            {
              ...users[0],
              id: users[0].id + 1,
              profile: {
                ...userProfiles[0],
                fullName: userProfiles[0].fullName,
              },
            },
            userProfileToUpdate,
            userProfileAvatar,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest
          .spyOn(usersService, 'updateProfile')
          .mockImplementation(async () => {
            throw new Error();
          });

        await expect(
          usersController.updateUserProfileAvatar(
            users[0],
            userProfileToUpdate,
            userProfileAvatar,
          ),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and the given user id between param and body are match', () => {
      it(`should return a ${SuccessResponseDto.name} with message`, async () => {
        const storagesServiceCreateLocalFileSpy: jest.SpyInstance<
          Promise<LocalFile>,
          [file: LocalFile]
        > = jest.spyOn(storagesService, 'createLocalFile');

        storagesServiceCreateLocalFileSpy.mockResolvedValue(
          userProfileAvatarLocalFile,
        );

        expect(
          await usersController.updateUserProfileAvatar(
            users[0],
            userProfileToUpdate,
            userProfileAvatar,
          ),
        ).toStrictEqual(
          new SuccessResponseDto({
            message: 'User profile avatar updated',
          }),
        );
      });
    });
  });
});
