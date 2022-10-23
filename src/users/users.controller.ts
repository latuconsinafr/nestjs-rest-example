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

@Controller('users')
export class UsersController {
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): string {
    return `This action adds a new user (username: ${createUserDto.username} and password: ${createUserDto.password}).`;
  }

  // * Asynchronous example
  @Get()
  async findAllUsers(@Query() query: ListAllUsers): Promise<string> {
    return `This action returns all users (limit: ${query.limit} items).`;
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
