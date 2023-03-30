import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the users service that responsible for data storage and retrieval for user related entity.
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
   * Creates a user.
   *
   * @param user A user to create
   *
   * @returns The created user.
   */
  async create(user: User): Promise<User> {
    this.logger.info(`Try to call ${UsersService.prototype.create.name}`);

    const createdUser = this.usersRepository.create({
      ...user,
      password: await argon2.hash(user.password),
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

    return await this.usersRepository.find({
      relations: { profile: true },
    });
  }

  /**
   * Gets a user by a given id.
   *
   * @param id The id to find
   *
   * @returns The user if it exists, otherwise null.
   */
  async findById(id: string): Promise<User | null> {
    this.logger.info(`Try to call ${UsersService.prototype.findById.name}`);

    return await this.usersRepository.findOne({
      where: { id },
      relations: { profile: true },
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
      relations: { profile: true },
    });
  }

  /**
   * Gets a user by a given email.
   *
   * @param email The email to find
   *
   * @returns The user if it exists, otherwise null.
   */
  async findByEmail(email: string): Promise<User | null> {
    this.logger.info(`Try to call ${UsersService.prototype.findByEmail.name}`);

    return await this.usersRepository.findOne({
      where: { email },
      relations: { profile: true },
    });
  }

  /**
   * Gets a user by a given phone.
   *
   * @param phone The phone to find
   *
   * @returns The user if it exists, otherwise null.
   */
  async findByPhone(phone: string): Promise<User | null> {
    this.logger.info(`Try to call ${UsersService.prototype.findByPhone.name}`);

    return await this.usersRepository.findOne({
      where: { phone },
      relations: { profile: true },
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
  async update(id: string, user: User): Promise<boolean> {
    this.logger.info(`Try to call ${UsersService.prototype.update.name}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, profile, ...userToUpdate } = user;

    await this.usersRepository.update(id, userToUpdate);

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
  async delete(id: string): Promise<boolean> {
    this.logger.info(`Try to call ${UsersService.prototype.delete.name}`);

    await this.usersRepository.delete(id);

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
  async updatePassword(id: string, password: string): Promise<boolean> {
    this.logger.info(
      `Try to call ${UsersService.prototype.updatePassword.name}`,
    );

    await this.usersRepository.update(id, {
      password: await argon2.hash(password),
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
  async updateProfile(id: string, userProfile: UserProfile): Promise<boolean> {
    this.logger.info(
      `Try to call ${UsersService.prototype.updateProfile.name}`,
    );

    await this.usersRepository.save({
      ...(await this.findById(id)),
      profile: userProfile,
    });

    return true;
  }
}
