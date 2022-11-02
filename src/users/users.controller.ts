import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { NotFoundException } from '../exceptions/not-found.exception';
import { RolesGuard } from '../guards/roles.guard';
import { ParseIntPipe } from '../pipes/parse-int.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
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
  @SetMetadata('roles', ['admin'])
  @UseGuards(RolesGuard)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.usersService.create(createUserDto);
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
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
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
  ): User {
    if (user === undefined) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return user;
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
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} user.`;
  }
}
