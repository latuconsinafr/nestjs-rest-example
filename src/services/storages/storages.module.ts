import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from './entities/local-file.entity';
import { StoragesController } from './storages.controller';
import { StoragesService } from './storages.service';

/**
 * Defines the storages module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  providers: [StoragesService],
  controllers: [StoragesController],
  exports: [StoragesService],
})
export class StoragesModule {}
