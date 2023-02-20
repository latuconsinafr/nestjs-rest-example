import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { IsRoleExistByIdValidator } from './validators/is-role-exist-by-id.validator';
import { IsRoleExistByNameValidator } from './validators/is-role-exist-by-name.validator';

/**
 * Defines the roles module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [
    RolesService,

    IsRoleExistByIdValidator,
    IsRoleExistByNameValidator,
  ],
  controllers: [],
  exports: [RolesService],
})
export class RolesModule {}
