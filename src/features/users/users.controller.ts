import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SuccessResponseDto } from '../../common/dto/responses/response.dto';
import { UserRole } from '../../common/enums/user-role.enum';
import { SuccessResponse } from '../../common/interfaces/http-response.interface';
import { Auth } from '../../decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersService } from './users.service';

/**
 * Defines the users controller.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a user endpoint.
   *
   * @param createUserDto The DTO that carries data to create a user
   */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(plainToInstance(User, createUserDto));
  }

  // * Asynchronous example
  // * Prefer applying filters by using classes instead of instances when possible
  // * @see {@link https://docs.nestjs.com/exception-filters documentation}
  /**
   * Get all users endpoint.
   *
   * @returns The users array.
   */
  @Get()
  // @UseFilters(AllExceptionsFilter)
  async findAllUsers(): Promise<SuccessResponse> {
    return new SuccessResponseDto({
      message: 'Users retrieved',
      data: await this.usersService.findAll(),
    });
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
   * @returns The user.
   */
  @Get(':id')
  findUserById(
    @Param('id', UserByIdPipe)
    user: User,
  ): SuccessResponse {
    return new SuccessResponseDto({
      message: 'User retrieved',
      data: user,
    });
  }

  /**
   * Update a user by a given id endpoint.
   *
   * @param id The user id to find
   *
   * @returns The action string.
   */
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number): string {
    return `This action updates a #${id} user.`;
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
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} user.`;
  }
}
