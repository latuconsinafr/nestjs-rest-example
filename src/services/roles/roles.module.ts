import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

/**
 * Defines the roles module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [],
  exports: [RolesService],
})
export class RolesModule {}
