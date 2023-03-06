import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { SuccessResponse } from '../../common/dto/responses/success-response.dto';
import { CreateUserRequest } from './dto/requests/users/create-user-request.dto';
import { User } from './entities/user.entity';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersService } from './users.service';
import { UpdateUserRequest } from './dto/requests/users/update-user-request.dto';
import { ConflictException } from '../../common/exceptions/conflict.exception';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import { PinoLogger } from 'nestjs-pino';
import { UpdateUserProfileRequest } from './dto/requests/user-profiles/update-user-profile-request.dto';
import { StoragesService } from '../storages/storages.service';
import { CreateLocalFileRequest } from '../storages/dto/requests/create-local-file-request.dto';
import { UserProfile } from './entities/user-profile.entity';
import { FileGeneralAccess } from '../storages/enums/file-general-access.enum';
import { UserByIdHook } from './permissions/hooks/users/user-by-id.hook';
import { UseAccessControl } from '../auth/decorators/use-access-control.decorator';
import { UserActions } from './permissions/user.permissions';
import { UpdateUserPasswordRequest } from './dto/requests/users/update-user-password-request.dto';
import { UpdateUserRolesRequest } from './dto/requests/users/update-user-roles-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserResponse } from './dto/responses/users/user-response.dto';
import { ApiErrorsResponse } from '../../common/decorators/open-api/api-errors-response.decorator';
import { RolesService } from '../roles/roles.service';
import { ApiUnprocessableEntityErrorResponse } from '../../common/decorators/open-api/errors/api-unprocessable-entity-error-response.decorator';
import { ApiUnauthorizedErrorResponse } from '../../common/decorators/open-api/errors/api-unauthorized-error-response.decorator';
import { ApiForbiddenErrorResponse } from '../../common/decorators/open-api/errors/api-forbidden-error-response.decorator';
import { ApiConflictErrorResponse } from '../../common/decorators/open-api/errors/api-conflict-error-response.decorator';
import { ApiCreatedSuccessResponse } from '../../common/decorators/open-api/successes/api-created-success-response.decorator';
import { ApiOkSuccessResponse } from '../../common/decorators/open-api/successes/api-ok-success-response.decorator';
import { ApiSuccessesResponse } from '../../common/decorators/open-api/api-successes-response.decorator';
import { APP_VERSION } from '../../common/constants';
import { ApiUuidParam } from '../../common/decorators/open-api/params/api-uuid-param.decorator';
import { ApiFile } from '../../common/decorators/open-api/api-file.decorator';
import { UpdateUserProfileAvatarRequest } from './dto/requests/user-profiles/update-user-profile-avatar-request.dto';
import avatarFileFilterValidator from './validators/file-filters/avatar-file-filter.validator';

/**
 * Defines the users controller.
 */
@Controller({
  path: 'users',
  version: APP_VERSION,
})
@ApiTags('Users')
export class UsersController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param usersService The users service
   * @param rolesService The roles service
   * @param storagesService The storages service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly storagesService: StoragesService,
  ) {
    this.logger.setContext(UsersController.name);
  }

  /**
   * Create a user endpoint.
   *
   * @param createUserRequest The DTO that carries data to create a user
   *
   * @returns The success response with `'User created'` message and created `user` data.
   */
  @Post()
  @UseAccessControl(UserActions.Create, User)
  @ApiBearerAuth()
  @ApiSuccessesResponse([
    {
      response: ApiCreatedSuccessResponse,
      options: {
        model: UserResponse,
        options: { description: 'User created' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<SuccessResponse<UserResponse>> {
    this.logger.info(
      `Try to call ${UsersController.prototype.createUser.name}`,
    );

    try {
      const user = CreateUserRequest.toEntity(createUserRequest);

      return new SuccessResponse({
        message: 'User created',
        data: await this.usersService.create({
          ...user,
          roles: await this.rolesService.findByNames(createUserRequest.roles),
        }),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Get all users endpoint.
   *
   * @returns The success response with `'Users retrieved'` message and `users` data.
   */
  @Get()
  @UseAccessControl(UserActions.ReadAll, User)
  @ApiBearerAuth()
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        model: UserResponse,
        isArray: true,
        options: { description: 'Users retrieved' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
  ])
  async findAllUsers(): Promise<SuccessResponse<UserResponse[]>> {
    this.logger.info(
      `Try to call ${UsersController.prototype.findAllUsers.name}`,
    );

    try {
      return new SuccessResponse({
        message: 'Users retrieved',
        data: await this.usersService.findAll(),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Get a user by a given id endpoint.
   *
   * @param user The specified user to get
   *
   * @returns The success response with `'User retrieved'` message and a `user` data.
   */
  @Get(':id')
  @UseAccessControl(UserActions.ReadBy, User, UserByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of user' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        model: UserResponse,
        options: { description: 'User retrieved' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async findUserById(
    @Param('id', UserByIdPipe) user: User,
  ): Promise<SuccessResponse<UserResponse>> {
    this.logger.info(
      `Try to call ${UsersController.prototype.findUserById.name}`,
    );

    return new SuccessResponse({
      message: 'User retrieved',
      data: user,
    });
  }

  /**
   * Update a user by a given id endpoint.
   *
   * @param id The user id request parameter
   * @param updateUserRequest The DTO that carries data to update a user
   *
   * @returns The success response with `'User updated'` message.
   */
  @Put(':id')
  @UseAccessControl(UserActions.Update, User, UserByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of user' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'User updated' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiConflictErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async updateUser(
    @Param('id', UserByIdPipe) { id }: User,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUser.name}`,
    );

    if (id !== updateUserRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      await this.usersService.update(
        id,
        UpdateUserRequest.toEntity(updateUserRequest),
      );

      return new SuccessResponse({
        message: 'User updated',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Delete a user by a given id endpoint.
   *
   * @param id The user id to find
   *
   * @returns The success response with `'User deleted'` message.
   */
  @Delete(':id')
  @UseAccessControl(UserActions.Delete, User)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of user' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'User deleted' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
  ])
  async deleteUser(
    @Param('id', UserByIdPipe) { id }: User,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.deleteUser.name}`,
    );

    try {
      await this.usersService.delete(id);

      return new SuccessResponse({
        message: 'User deleted',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Update a user's password by a given id endpoint.
   *
   * @param id The user id request parameter
   * @param updateUserPasswordRequest The DTO that carries data to update a user's password
   *
   * @returns The success response with `'User updated'` message.
   */
  @Put(':id/password')
  @UseAccessControl(UserActions.Update, User, UserByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of user' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'User password updated' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiConflictErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async updateUserPassword(
    @Param('id', UserByIdPipe) { id }: User,
    @Body() updateUserPasswordRequest: UpdateUserPasswordRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserPassword.name}`,
    );

    if (id !== updateUserPasswordRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      await this.usersService.updatePassword(
        id,
        updateUserPasswordRequest.password,
      );

      return new SuccessResponse({
        message: `User password updated`,
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Update a user's roles by a given id endpoint.
   *
   * @param id The user id request parameter
   * @param updateUserRolesRequest The DTO that carries data to update a user's roles
   *
   * @returns The success response with `'User updated'` message.
   */
  @Put(':id/roles')
  @UseAccessControl(UserActions.Update, User, UserByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of user' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'User roles updated' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiConflictErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async updateUserRoles(
    @Param('id', UserByIdPipe) { id }: User,
    @Body() updateUserRolesRequest: UpdateUserRolesRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserRoles.name}`,
    );

    if (id !== updateUserRolesRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      await this.usersService.updateRoles(
        id,
        await this.rolesService.findByNames(updateUserRolesRequest.roles),
      );

      return new SuccessResponse({
        message: `User roles updated`,
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Update a user profile by a given id endpoint.
   *
   * @param id The user id request parameter
   * @param updateUserProfileRequest The DTO that carries data to update a user profile
   *
   * @returns The success response with `'User profile updated'` message.
   */
  @Put(':id/profile')
  @UseAccessControl(UserActions.Update, User, UserByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of user' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'User profile updated' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiConflictErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async updateUserProfile(
    @Param('id', UserByIdPipe) { id }: User,
    @Body() updateUserProfileRequest: UpdateUserProfileRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserProfile.name}`,
    );

    if (id !== updateUserProfileRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      await this.usersService.updateProfile(
        id,
        UpdateUserProfileRequest.toEntity(updateUserProfileRequest),
      );

      return new SuccessResponse({
        message: 'User profile updated',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Upload a user profile avatar by a given id endpoint.
   *
   * @param avatar The user profile avatar
   */
  @Put(':id/profile/avatar/upload')
  @UseAccessControl(UserActions.Update, User, UserByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of user' })
  @ApiFile('avatar', {
    dest: '/users/profiles/avatars',
    fileFilter: avatarFileFilterValidator,
    limits: { fileSize: Math.pow(1024, 2) }, // * 1 MB
  })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'User profile avatar updated' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiConflictErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async updateUserProfileAvatar(
    @Param('id', UserByIdPipe) user: User,
    @Body() updateUserProfileAvatarRequest: UpdateUserProfileAvatarRequest,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserProfileAvatar.name}`,
    );

    if (user.id !== updateUserProfileAvatarRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      const avatarFile = await this.storagesService.createLocalFile(
        CreateLocalFileRequest.toEntity(avatar, {
          generalAccess: FileGeneralAccess.Public,
          ownerId: user.id,
        }),
      );

      await this.usersService.updateProfile(
        user.id,
        new UserProfile({
          ...user.profile,
          avatarFile: avatarFile,
        }),
      );

      return new SuccessResponse({
        message: 'User profile avatar updated',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
