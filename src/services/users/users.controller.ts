import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessResponseDto } from '../../common/dto/responses/success-response.dto';
import { CreateUserRequest } from './dto/requests/users/create-user-request.dto';
import { User } from './entities/user.entity';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersService } from './users.service';
import { SuccessResponse } from '../../common/interfaces/http/success-response.interface';
import { UpdateUserRequest } from './dto/requests/users/update-user-request.dto';
import { ConflictException } from '../../common/exceptions/conflict.exception';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import { PinoLogger } from 'nestjs-pino';
import { UpdateUserProfileRequest } from './dto/requests/user-profiles/update-user-profile-request.dto';
import { StoragesService } from '../storages/storages.service';
import { CreateLocalFileRequest } from '../storages/dto/requests/create-local-file-request.dto';
import { LocalFileInterceptor } from '../storages/interceptors/local-file-interceptor';
import { UserProfile } from './entities/user-profile.entity';
import { UserIdParam } from './dto/params/users/user-id.param';
import { FileGeneralAccess } from '../storages/enums/file-general-access.enum';
import { UserHook } from './permissions/hooks/user.hook';
import { UseAccessControl } from '../auth/decorators/use-access-control.decorator';
import { UserActions } from './permissions/user.permission';
import { UpdateUserPasswordRequest } from './dto/requests/users/update-user-password-request.dto';
import { UpdateUserRolesRequest } from './dto/requests/users/update-user-roles-request.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

/**
 * Defines the users controller.
 */
@Controller({
  version: '1',
  path: 'users',
})
@ApiTags('Users')
export class UsersController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param usersService The users service
   * @param storagesService The storages service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
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
  @ApiCreatedResponse({ description: 'User created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.createUser.name}`,
    );

    try {
      return new SuccessResponseDto({
        message: 'User created',
        data: await this.usersService.create(
          CreateUserRequest.toEntity(createUserRequest),
          createUserRequest.roles,
        ),
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
  @ApiOkResponse({ description: 'Users retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async findAllUsers(): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.findAllUsers.name}`,
    );

    try {
      return new SuccessResponseDto({
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
  @UseAccessControl(UserActions.ReadBy, User, UserHook)
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of user',
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async findUserById(
    @Param('id', UserByIdPipe) user: User,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.findUserById.name}`,
    );

    return new SuccessResponseDto({
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
  @UseAccessControl(UserActions.Update, User, UserHook)
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of user',
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Inconsistent user id' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
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

      return new SuccessResponseDto({
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
   * @returns The action string.
   */
  @Delete(':id')
  @UseAccessControl(UserActions.Delete, User)
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of user',
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async deleteUser(@Param('id', UserByIdPipe) { id }: User) {
    this.logger.info(
      `Try to call ${UsersController.prototype.deleteUser.name}`,
    );

    try {
      await this.usersService.delete(id);

      return new SuccessResponseDto({
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
  @UseAccessControl(UserActions.Update, User, UserHook)
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of user',
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User password updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Inconsistent user id' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
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

      return new SuccessResponseDto({
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
  @UseAccessControl(UserActions.Update, User, UserHook)
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of user',
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User roles updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Inconsistent user id' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async updateUserRoles(
    @Param('id', UserByIdPipe) user: User,
    @Body() updateUserRolesRequest: UpdateUserRolesRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserRoles.name}`,
    );

    if (user.id !== updateUserRolesRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      await this.usersService.updateRoles(user, updateUserRolesRequest.roles);

      return new SuccessResponseDto({
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
  @UseAccessControl(UserActions.Update, User, UserHook)
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of user',
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User profile updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Inconsistent user id' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
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

      return new SuccessResponseDto({
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
  @UseAccessControl(UserActions.Update, User, UserHook)
  @UseInterceptors(
    LocalFileInterceptor('avatar', { dest: '/users/profiles/avatars' }),
  )
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of user',
    example: 1,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User profile avatar updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Inconsistent user id' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  async updateUserProfileAvatar(
    @Param('id', UserByIdPipe) user: User,
    @Body() updateUserProfileAvatarRequest: UserIdParam,
    @UploadedFile() avatar: Express.Multer.File, // TODO: File validator,
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

      return new SuccessResponseDto({
        message: 'User profile avatar updated',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
