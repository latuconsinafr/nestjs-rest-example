import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'nest-casl';
import { Topic } from './entities/topic.entity';
import { TopicPermissions } from './permissions/topic.permissions';
import { TopicByIdPipe } from './pipes/topic-by-id.pipe';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

/**
 * Defines the topics module.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    CaslModule.forFeature({ permissions: TopicPermissions }),
  ],
  providers: [TopicsService, TopicByIdPipe],
  controllers: [TopicsController],
  exports: [TopicsService],
})
export class TopicsModule {}
