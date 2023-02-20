import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from './entities/local-file.entity';
import { StoragesController } from './storages.controller';
import { StoragesService } from './storages.service';
import { IsLocalFileExistValidator } from './validators/is-local-file-exist.validator';

/**
 * Defines the storages module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  providers: [StoragesService, IsLocalFileExistValidator],
  controllers: [StoragesController],
  exports: [StoragesService],
})
export class StoragesModule {}
