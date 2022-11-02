import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the users service that responsible for data storage and retrieval for user entity.
 */
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

  /**
   * Create a user.
   *
   * @param user A user to create
   */
  create(user: Omit<User, 'id'>): void {
    this.users.push({ ...user, id: this.users.length + 1 });
  }

  /**
   * Get all users.
   *
   * @returns The users array.
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * Get a user by a given id.
   *
   * @param id The id to find
   *
   * @returns The use if it exists, otherwise undefined.
   */
  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
