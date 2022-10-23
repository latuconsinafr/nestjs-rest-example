import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  @Post()
  createUser(): string {
    return 'This action adds a new user.';
  }

  @Get()
  // * To use standard approach and library-specific approach set the passthrough option to true
  // * Reference: https://docs.nestjs.com/controllers
  findAllUsers(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Response {
    return response.status(200).send('This action returns all users.');
  }

  @Get(':id')
  findOneUser(@Param() params: { id: string }): string {
    return `This action returns a #${params.id} user.`;
  }
}
