import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from './enums/user-role.enum';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the roles service that responsible for data storage and retrieval for role entity.
 */
@Injectable()
export class RolesService {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param rolesRepository The repository of role entity
   */
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {
    this.logger.setContext(RolesService.name);
  }

  /**
   * Gets all roles.
   *
   * @returns The roles array.
   */
  async findAll(): Promise<Role[]> {
    this.logger.info(`Try to call ${RolesService.prototype.findAll.name}`);

    return await this.rolesRepository.find();
  }

  /**
   * Gets a role by a given id.
   *
   * @param id The id to find
   *
   * @returns The role if it exists, otherwise null.
   */
  async findById(id: string): Promise<Role | null> {
    this.logger.info(`Try to call ${RolesService.prototype.findById.name}`);

    return await this.rolesRepository.findOne({
      where: { id },
    });
  }

  /**
   * Get role by a given name.
   *
   * @param name The role name to find
   *
   * @returns The role if it exists, otherwise null.
   */
  async findByName(name: UserRole): Promise<Role | null> {
    this.logger.info(`Try to call ${RolesService.prototype.findByName.name}`);

    return await this.rolesRepository.findOne({
      where: { name },
    });
  }

  /**
   * Get roles by a given set of name.
   *
   * @param names The set of role name to find
   *
   * @returns The roles array.
   */
  async findByNames(names: UserRole[]): Promise<Role[]> {
    this.logger.info(`Try to call ${RolesService.prototype.findByNames.name}`);

    return await this.rolesRepository.find({
      where: { name: In(names) },
    });
  }
}
