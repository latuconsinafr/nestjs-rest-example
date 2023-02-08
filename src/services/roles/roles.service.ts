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
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {
    this.logger.setContext(RolesService.name);
  }

  /**
   * Get roles by a given set of name.
   *
   * @param names The set of user role name to find
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
