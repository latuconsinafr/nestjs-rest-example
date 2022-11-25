import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SuccessResponseDto } from '../../common/dto/responses/success-response.dto';
import { UserRole } from '../../common/enums/user-role.enum';
import { Auth } from '../../common/decorators/auth.decorator';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { User } from './entities/user.entity';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersService } from './users.service';
import { SuccessResponse } from '../../common/interfaces/http/success-response.interface';
import { UpdateUserRequest } from './dto/requests/update-user-request.dto';
import { ConflictException } from '../../common/exceptions/conflict.exception';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import { PinoLogger } from 'nestjs-pino';

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
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
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
    try {
      this.logger.info(
        `Try to call ${UsersController.prototype.createUser.name}`,
      );

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
    try {
      this.logger.info(
        `Try to call ${UsersController.prototype.findAllUsers.name}`,
      );

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
    @Param('id', UserByIdPipe)
    user: User,
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
    if (id !== updateUserRequest.id) {
      throw new ConflictException({ message: `Inconsistent user id` });
    }

    try {
      this.logger.info(
        `Try to call ${UsersController.prototype.updateUser.name}`,
      );

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
    try {
      this.logger.info(
        `Try to call ${UsersController.prototype.deleteUser.name}`,
      );

      await this.usersService.delete(id);

      return new SuccessResponseDto({
        message: 'User deleted',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
