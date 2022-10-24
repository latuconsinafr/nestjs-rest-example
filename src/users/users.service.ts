import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

// * Service will be responsible for data storage and retrieval
@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}
