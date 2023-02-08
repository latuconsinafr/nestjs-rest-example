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
  Request,
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

/**
 * Defines the users controller.
 */
@Controller({
  version: '1',
  path: 'users',
})
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
    private readonly caslAbilityFactory: CaslAbilityFactory,
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
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
    @Request() { authenticatedUser }: RequestWithUser,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.createUser.name}`,
    );

    this.caslAbilityFactory.checkUserAbility(
      authenticatedUser,
      Actions.Create,
      User,
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
  async findAllUsers(): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.findAllUsers.name}`,
    );

    this.caslAbilityFactory.checkUserAbility(
      authenticatedUser,
      Actions.ReadAll,
      User,
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
  async findUserById(
    @Param('id', UserByIdPipe) user: User,
    @Request() { authenticatedUser }: RequestWithUser,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.findUserById.name}`,
    );

    this.caslAbilityFactory.checkUserAbility(
      authenticatedUser,
      Actions.ReadSingle,
      user,
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
  async updateUser(
    @Param('id', UserByIdPipe) user: User,
    @Body() updateUserRequest: UpdateUserRequest,
    @Request() { authenticatedUser }: RequestWithUser,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUser.name}`,
    );

    this.caslAbilityFactory.checkUserAbility(
      authenticatedUser,
      Actions.Update,
      user,
    );

    if (user.id !== updateUserRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      await this.usersService.update(
        user.id,
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
  async deleteUser(@Param('id', UserByIdPipe) { id }: User) {
    this.logger.info(
      `Try to call ${UsersController.prototype.deleteUser.name}`,
    );

    this.caslAbilityFactory.checkUserAbility(
      authenticatedUser,
      Actions.Delete,
      User,
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
        message: `User's password updated`,
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
        message: `User's roles updated`,
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
  async updateUserProfile(
    @Param('id', UserByIdPipe) user: User,
    @Body() updateUserProfileRequest: UpdateUserProfileRequest,
    @Request() { authenticatedUser }: RequestWithUser,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserProfile.name}`,
    );

    this.caslAbilityFactory.checkUserAbility(
      authenticatedUser,
      Actions.Update,
      user,
    );

    if (user.id !== updateUserProfileRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      await this.usersService.updateProfile(
        user.id,
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
  async updateUserProfileAvatar(
    @Param('id', UserByIdPipe) user: User,
    @Body() updateUserProfileAvatarRequest: UserIdParam,
    @UploadedFile() avatar: Express.Multer.File, // TODO: File validator,
    @Request() { authenticatedUser }: RequestWithUser,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserProfileAvatar.name}`,
    );

    this.caslAbilityFactory.checkUserAbility(
      authenticatedUser,
      Actions.Update,
      user,
    );

    if (user.id !== updateUserProfileAvatarRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      const avatarFile = await this.storagesService.createLocalFile(
        CreateLocalFileRequest.toEntity(avatar, {
          generalAccess: FileGeneralAccess.Public,
          // TODO : The owner id should be the authenticated user's id
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
