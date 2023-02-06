import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users.service';

@Injectable()
export class UserHook implements SubjectBeforeFilterHook<User, Request> {
  constructor(private readonly usersService: UsersService) {}

  async run({ params }: Request): Promise<User | undefined> {
    return (await this.usersService.findById(params.id)) ?? undefined;
  }
}
