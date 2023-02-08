import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../../common/services/casl/casl.module';
import { LocalFile } from './entities/local-file.entity';
import { StoragesController } from './storages.controller';
import { StoragesService } from './storages.service';

/**
 * Defines the storages module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([LocalFile]), CaslModule],
  providers: [StoragesService],
  controllers: [StoragesController],
  exports: [StoragesService],
})
export class StoragesModule {}
