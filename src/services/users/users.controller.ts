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
import { UserRole } from '../../common/enums/user-role.enum';
import { Auth } from '../../common/decorators/auth.decorator';
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
import { FileGeneralAccess } from '../../common/enums/file-general-access.enum';
import { LocalFileInterceptor } from '../storages/interceptors/local-file-interceptor';
import { UserProfile } from './entities/user-profile.entity';

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
        ),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  // * Asynchronous example
  // * Prefer applying filters by using classes instead of instances when possible
  // * @see {@link https://docs.nestjs.com/exception-filters documentation}
  /**
   * Get all users endpoint.
   *
   * @returns The success response with `'Users retrieved'` message and `users` data.
   */
  @Get()
  // @UseFilters(AllExceptionsFilter)
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

  // * Observable streams example
  // @Get()
  // findAllUsers(): Observable<[]> {
  //   return of([]);
  // }

  /**
   * Get a user by a given id endpoint.
   *
   * @param user The specified user to get
   *
   * @returns The success response with `'User retrieved'` message and a `user` data.
   */
  @Get(':id')
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
   * @param params The user id request parameter
   * @param updateUserRequest The DTO that carries data to update a user
   *
   * @returns The success response with `'User updated'` message.
   */
  @Put(':id')
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
  @Auth(UserRole.SuperAdmin)
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
   * Update a user profile by a given id endpoint.
   *
   * @param params The user id request parameter
   * @param updateUserProfileRequest The DTO that carries data to update a user profile
   *
   * @returns The success response with `'User profile updated'` message.
   */
  @Put('profile/:id')
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
  @Put('profile/:id/avatar/upload')
  @UseInterceptors(
    LocalFileInterceptor('avatar', { dest: '/users/profiles/avatars' }),
  )
  async updateUserProfileAvatar(
    @Param('id', UserByIdPipe) user: User,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${UsersController.prototype.updateUserProfileAvatar.name}`,
    );

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
