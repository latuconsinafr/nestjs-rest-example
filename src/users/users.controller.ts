import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { NotFoundException } from '../exceptions/not-found.exception';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
import { RolesGuard } from '../guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @SetMetadata('roles', ['admin'])
  @UseGuards(RolesGuard)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.usersService.create(createUserDto);
  }

  // * Asynchronous example
  @Get()
  // * Prefer applying filters by using classes instead of instances when possible
  // * Reference: https://docs.nestjs.com/exception-filters
  // @UseFilters(AllExceptionsFilter)
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // * Observable streams example
  // @Get()
  // findAllUsers(): Observable<[]> {
  //   return of([]);
  // }

  @Get(':id')
  findOneUser(
    @Param('id', UserByIdPipe)
    user: User,
  ): User {
    if (user === undefined) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return user;
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number): string {
    return `This action updates a #${id} user.`;
  }

  @Delete(':id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} user.`;
  }
}
