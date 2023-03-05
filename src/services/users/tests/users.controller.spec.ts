import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
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
import { RolesService } from '../../roles/roles.service';
import { Role } from '../../roles/entities/role.entity';
import { SuccessResponse } from '../../../common/dto/responses/success-response.dto';
import { AccessService } from 'nest-casl';
import { UpdateUserPasswordRequest } from '../dto/requests/users/update-user-password-request.dto';
import { UpdateUserRolesRequest } from '../dto/requests/users/update-user-roles-request.dto';
import { UpdateUserProfileAvatarRequest } from '../dto/requests/user-profiles/update-user-profile-avatar-request.dto';
import { localFilesData } from '../../../database/data/local-files.data';
import { UserRole } from '../../roles/enums/user-role.enum';
import { rolesData } from '../../../database/data/roles.data';

describe(UsersController.name, () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let rolesService: RolesService;
  let storagesService: StoragesService;

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
        RolesService,
        {
          provide: getRepositoryToken(Role),
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
        {
          provide: AccessService,
          useValue: {},
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    rolesService = moduleRef.get<RolesService>(RolesService);
    storagesService = moduleRef.get<StoragesService>(StoragesService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${UsersController.prototype.createUser.name} is called`, () => {
    let userToCreate: CreateUserRequest;
    let usersServiceCreateSpy: jest.SpyInstance<Promise<User>, [user: User]>;
    let rolesServiceFindByNamesSpy: jest.SpyInstance<
      Promise<Role[]>,
      [names: UserRole[]]
    >;

    beforeEach(() => {
      userToCreate = {
        ...usersData[0],
        roles: usersData[0].roles.map((role) => role.name),
      };
      usersServiceCreateSpy = jest.spyOn(usersService, 'create');
      usersServiceCreateSpy.mockResolvedValue(usersData[0]);
      rolesServiceFindByNamesSpy = jest.spyOn(rolesService, 'findByNames');
      rolesServiceFindByNamesSpy.mockResolvedValue([...rolesData]);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'create').mockImplementationOnce(async () => {
          throw new Error();
        });
        await expect(usersController.createUser(userToCreate)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${UsersService.name} ${UsersService.prototype.create.name} method`, async () => {
        await usersController.createUser(userToCreate);

        expect(usersServiceCreateSpy).toBeCalledTimes(1);
      });

      it(`should call ${RolesService.name} ${RolesService.prototype.findByNames.name} method`, async () => {
        await usersController.createUser(userToCreate);

        expect(rolesServiceFindByNamesSpy).toBeCalledTimes(1);
      });

      it('should return a message and data contains the created user', async () => {
        expect(await usersController.createUser(userToCreate)).toStrictEqual(
          new SuccessResponse({
            message: 'User created',
            data: usersData[0],
          }),
        );
      });
    });
  });

  describe(`when ${UsersController.prototype.findAllUsers.name} is called`, () => {
    let usersServiceFindAllSpy: jest.SpyInstance<Promise<User[]>, []>;

    beforeEach(() => {
      usersServiceFindAllSpy = jest.spyOn(usersService, 'findAll');
      usersServiceFindAllSpy.mockResolvedValue([...usersData]);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'findAll').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(usersController.findAllUsers()).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${UsersService.name} ${UsersService.prototype.findAll.name} method`, async () => {
        await usersController.findAllUsers();

        expect(usersServiceFindAllSpy).toBeCalledTimes(1);
      });

      it(`should return a message and data contains array of users`, async () => {
        expect(await usersController.findAllUsers()).toStrictEqual(
          new SuccessResponse({
            message: 'Users retrieved',
            data: usersData,
          }),
        );
      });
    });
  });

  describe(`when ${UsersController.prototype.findUserById.name} is called`, () => {
    it(`should return a message and data contains a user`, async () => {
      expect(await usersController.findUserById(usersData[0])).toStrictEqual(
        new SuccessResponse({
          message: 'User retrieved',
          data: usersData[0],
        }),
      );
    });
  });

  describe(`when ${UsersController.prototype.updateUser.name} is called`, () => {
    let userToUpdate: UpdateUserRequest;
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, user: User]
    >;

    beforeEach(() => {
      userToUpdate = { ...usersData[0] };
      usersServiceUpdateSpy = jest.spyOn(usersService, 'update');
      usersServiceUpdateSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUser(
            {
              ...usersData[1],
              profile: {
                ...userProfilesData[1],
                fullName: userProfilesData[1].fullName,
              },
            },
            userToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'update').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(
          usersController.updateUser(usersData[0], userToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${UsersService.name} ${UsersService.prototype.update.name} method`, async () => {
        await usersController.updateUser(usersData[0], userToUpdate);

        expect(usersServiceUpdateSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await usersController.updateUser(usersData[0], userToUpdate),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'User updated',
          }),
        );
      });
    });
  });

  describe(`when ${UsersController.prototype.deleteUser.name} is called`, () => {
    let usersServiceDeleteSpy: jest.SpyInstance<Promise<boolean>, [id: string]>;

    beforeEach(() => {
      usersServiceDeleteSpy = jest.spyOn(usersService, 'delete');
      usersServiceDeleteSpy.mockResolvedValue(true);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(usersService, 'delete').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(usersController.deleteUser(usersData[0])).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${UsersService.name} ${UsersService.prototype.delete.name} method`, async () => {
        await usersController.deleteUser(usersData[0]);

        expect(usersServiceDeleteSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(await usersController.deleteUser(usersData[0])).toStrictEqual(
          new SuccessResponse({
            message: 'User deleted',
          }),
        );
      });
    });
  });

  describe(`when ${UsersController.prototype.updateUserPassword.name} is called`, () => {
    let userPasswordToUpdate: UpdateUserPasswordRequest;
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, password: string]
    >;

    beforeEach(() => {
      userPasswordToUpdate = { ...usersData[0] };
      usersServiceUpdateSpy = jest.spyOn(usersService, 'updatePassword');
      usersServiceUpdateSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUserPassword(
            {
              ...usersData[1],
              profile: {
                ...userProfilesData[1],
                fullName: userProfilesData[1].fullName,
              },
            },
            userPasswordToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest
          .spyOn(usersService, 'updatePassword')
          .mockImplementationOnce(async () => {
            throw new Error();
          });

        await expect(
          usersController.updateUserPassword(
            usersData[0],
            userPasswordToUpdate,
          ),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${UsersService.name} ${UsersService.prototype.updatePassword.name} method`, async () => {
        await usersController.updateUserPassword(
          usersData[0],
          userPasswordToUpdate,
        );

        expect(usersServiceUpdateSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await usersController.updateUserPassword(
            usersData[0],
            userPasswordToUpdate,
          ),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'User password updated',
          }),
        );
      });
    });
  });

  describe(`when ${UsersController.prototype.updateUserRoles.name} is called`, () => {
    let userRolesToUpdate: UpdateUserRolesRequest;
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, roles: Role[]]
    >;

    beforeEach(() => {
      userRolesToUpdate = {
        ...usersData[0],
        roles: usersData[0].roles.map((role) => role.name),
      };
      usersServiceUpdateSpy = jest.spyOn(usersService, 'updateRoles');
      usersServiceUpdateSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUserRoles(
            {
              ...usersData[1],
              profile: {
                ...userProfilesData[1],
                fullName: userProfilesData[1].fullName,
              },
            },
            userRolesToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest
          .spyOn(usersService, 'updateRoles')
          .mockImplementationOnce(async () => {
            throw new Error();
          });

        await expect(
          usersController.updateUserRoles(usersData[0], userRolesToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${UsersService.name} ${UsersService.prototype.updateRoles.name} method`, async () => {
        await usersController.updateUserRoles(usersData[0], userRolesToUpdate);

        expect(usersServiceUpdateSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await usersController.updateUserRoles(
            usersData[0],
            userRolesToUpdate,
          ),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'User roles updated',
          }),
        );
      });
    });
  });

  describe(`when ${UsersController.prototype.updateUserProfile.name} is called`, () => {
    let userProfileToUpdate: UpdateUserProfileRequest;
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, userProfile: UserProfile]
    >;

    beforeEach(() => {
      userProfileToUpdate = { ...userProfilesData[0] };
      usersServiceUpdateSpy = jest.spyOn(usersService, 'updateProfile');
      usersServiceUpdateSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUserProfile(
            {
              ...usersData[1],
              profile: {
                ...userProfilesData[1],
                fullName: userProfilesData[1].fullName,
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
          .mockImplementationOnce(async () => {
            throw new Error();
          });

        await expect(
          usersController.updateUserProfile(usersData[0], userProfileToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${UsersService.name} ${UsersService.prototype.updateProfile.name} method`, async () => {
        await usersController.updateUserProfile(
          usersData[0],
          userProfileToUpdate,
        );

        expect(usersServiceUpdateSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await usersController.updateUserProfile(
            usersData[0],
            userProfileToUpdate,
          ),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'User profile updated',
          }),
        );
      });
    });
  });

  describe(`when ${UsersController.prototype.updateUserProfileAvatar.name} is called`, () => {
    let userProfileAvatar: Express.Multer.File;
    let userProfileAvatarToUpdate: UpdateUserProfileAvatarRequest;
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, userProfile: UserProfile]
    >;

    beforeEach(() => {
      userProfileAvatar = {
        fieldname: 'avatar',
        originalname: 'avatar.jpg',
        encoding: 'base64',
        mimetype: 'image/jpg',
        buffer: Buffer.from('test'),
        size: 51828,
      } as Express.Multer.File;
      userProfileAvatarToUpdate = {
        ...userProfilesData[0],
        avatar: userProfileAvatar,
      };
      usersServiceUpdateSpy = jest.spyOn(usersService, 'updateProfile');
      usersServiceUpdateSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUserProfileAvatar(
            {
              ...usersData[1],
              profile: {
                ...userProfilesData[1],
                fullName: userProfilesData[1].fullName,
              },
            },
            userProfileAvatarToUpdate,
            userProfileAvatar,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest
          .spyOn(usersService, 'updateProfile')
          .mockImplementationOnce(async () => {
            throw new Error();
          });

        await expect(
          usersController.updateUserProfileAvatar(
            usersData[0],
            userProfileAvatarToUpdate,
            userProfileAvatar,
          ),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      let storagesServiceCreateLocalFileSpy: jest.SpyInstance<
        Promise<LocalFile>,
        [file: LocalFile]
      >;

      beforeEach(() => {
        storagesServiceCreateLocalFileSpy = jest.spyOn(
          storagesService,
          'createLocalFile',
        );
        storagesServiceCreateLocalFileSpy.mockResolvedValue(localFilesData[0]);
      });

      it(`should call ${StoragesService.name} ${StoragesService.prototype.createLocalFile.name} method`, async () => {
        await usersController.updateUserProfileAvatar(
          usersData[0],
          userProfileAvatarToUpdate,
          userProfileAvatar,
        );

        expect(storagesServiceCreateLocalFileSpy).toBeCalledTimes(1);
      });

      it(`should call ${UsersService.name} ${UsersService.prototype.updateProfile.name} method`, async () => {
        await usersController.updateUserProfileAvatar(
          usersData[0],
          userProfileAvatarToUpdate,
          userProfileAvatar,
        );

        expect(usersServiceUpdateSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await usersController.updateUserProfileAvatar(
            usersData[0],
            userProfileAvatarToUpdate,
            userProfileAvatar,
          ),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'User profile avatar updated',
          }),
        );
      });
    });
  });
});
