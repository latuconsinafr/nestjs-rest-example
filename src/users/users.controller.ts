import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ListAllUsers } from './dto/list-all-users.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): string {
    this.usersService.create(createUserDto);

    return `This action adds a new user (username: ${createUserDto.username} and password: ${createUserDto.password}).`;
  }

  // * Asynchronous example
  @Get()
  async findAllUsers(@Query() query: ListAllUsers): Promise<User[]> {
    return this.usersService.findAll();

    // return `This action returns all users (limit: ${
    //   query.limit
    // } items). Users: ${this.usersService.findAll()}`;
  }

  // * Observable streams example
  // @Get()
  // findAllUsers(): Observable<[]> {
  //   return of([]);
  // }

  @Get(':id')
  findOneUser(@Param('id') id: string): string {
    return `This action returns a #${id} user.`;
  }

  @Put(':id')
  updateUser(@Param('id') id: string): string {
    return `This action updates a #${id} user.`;
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return `This action removes a #${id} user.`;
  }
}
