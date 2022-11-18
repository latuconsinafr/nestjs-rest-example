import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the users service that responsible for data storage and retrieval for user entity.
 */
@Injectable()
export class UsersService {
  /**
   * The constructor.
   *
   * @param usersRepository The repository of user entity
   */
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a user.
   *
   * @param user A user to create
   *
   * @returns The created user.
   */
  async create(user: User): Promise<User> {
    const createdUser: User = this.usersRepository.create({
      ...user,
    });

    await this.usersRepository.save(createdUser);

    return createdUser;
  }

  /**
   * Gets all users.
   *
   * @returns The users array.
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  /**
   * Gets a user by a given id.
   *
   * @param id The id to find
   *
   * @returns The user if it exists, otherwise null.
   */
  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  /**
   * Updates a user by a given id.
   *
   * @param id The id to find
   * @param user The user to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async update(id: number, user: User): Promise<boolean> {
    await this.usersRepository.update(id, { ...user });

    return true;
  }

  /**
   * Deletes a user by a given id.
   *
   * @param id The id to find
   *
   * @returns The flag indicates whether the delete process is success or not.
   * Return `true` if the delete process is success, otherwise `false`.
   */
  async delete(id: number): Promise<boolean> {
    await this.usersRepository.delete(id);

    return true;
  }
}
