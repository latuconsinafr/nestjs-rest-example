import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

// * Service will be responsible for data storage and retrieval
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'user',
      password: 'password',
      description: null,
    },
  ];

  create(user: Omit<User, 'id'>) {
    this.users.push({ ...user, id: this.users.length + 1 });
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
