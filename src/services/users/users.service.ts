import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { Role } from '../roles/entities/role.entity';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the users service that responsible for data storage and retrieval for user entity.
 */
@Injectable()
export class UsersService {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param usersRepository The repository of user entity
   */
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    this.logger.setContext(UsersService.name);
  }

  /**
   * Creates a user with its whole relations {@link Role} and {@link UserProfile}.
   *
   * @param user A user to create
   *
   * @returns The created user.
   */
  async create(user: User): Promise<User> {
    this.logger.info(`Try to call ${UsersService.prototype.create.name}`);

    const createdUser: User = this.usersRepository.create({
      ...user,
      ...(user.password
        ? { password: await argon2.hash(user.password) }
        : undefined),
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
    this.logger.info(`Try to call ${UsersService.prototype.findAll.name}`);

    return await this.usersRepository.find({ relations: ['roles', 'profile'] });
  }

  /**
   * Gets a user by a given id.
   *
   * @param id The id to find
   *
   * @returns The user if it exists, otherwise null.
   */
  async findById(id: number): Promise<User | null> {
    this.logger.info(`Try to call ${UsersService.prototype.findById.name}`);

    return await this.usersRepository.findOne({
      where: { id },
      relations: ['roles', 'profile'],
    });
  }

  /**
   * Gets a user by a given username.
   *
   * @param username The username to find
   *
   * @returns The user if it exists, otherwise null.
   */
  async findByUsername(username: string): Promise<User | null> {
    this.logger.info(
      `Try to call ${UsersService.prototype.findByUsername.name}`,
    );

    return await this.usersRepository.findOne({
      where: { username },
      relations: ['roles', 'profile'],
    });
  }

  /**
   * Updates a user by a given id.
   *
   * @param id The user id to update
   * @param user The user to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async update(id: number, user: User): Promise<boolean> {
    this.logger.info(`Try to call ${UsersService.prototype.update.name}`);

    await this.usersRepository.update(id, {
      ...user,
      ...(user.password
        ? { password: await argon2.hash(user.password) }
        : undefined),
    });

    return true;
  }

  /**
   * Updates a user password by a given id.
   *
   * @param id The user id to update
   * @param password The user password to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async updatePassword(id: number, password: string): Promise<boolean> {
    this.logger.info(
      `Try to call ${UsersService.prototype.updatePassword.name}`,
    );

    await this.usersRepository.update(id, {
      password: await argon2.hash(password),
    });

    return true;
  }

  /**
   * Updates a user roles by a given id.
   *
   * @param id The user id to update
   * @param roles The user roles to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async updateRoles(id: number, roles: Role[]): Promise<boolean> {
    this.logger.info(`Try to call ${UsersService.prototype.updateRoles.name}`);

    await this.usersRepository.save({
      ...(await this.findById(id)),
      roles: roles,
    });

    return true;
  }

  /**
   * Updates a user profile by a given id.
   *
   * @param id The id to find
   * @param userProfile The user profile to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async updateProfile(id: number, userProfile: UserProfile): Promise<boolean> {
    this.logger.info(
      `Try to call ${UsersService.prototype.updateProfile.name}`,
    );

    await this.usersRepository.save({
      ...(await this.findById(id)),
      profile: userProfile,
    });

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
    this.logger.info(`Try to call ${UsersService.prototype.delete.name}`);

    await this.usersRepository.delete(id);

    return true;
  }
}
