import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'nest-casl';
import { Topic } from './entities/topic.entity';
import { TopicPermissions } from './permissions/topic.permissions';
import { TopicByIdPipe } from './pipes/topic-by-id.pipe';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { IsNameUniqueValidator } from './validators/is-name-unique.validator';
import { IsTopicExistValidator } from './validators/is-topic-exist.validator';

/**
 * Defines the topics module.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    CaslModule.forFeature({ permissions: TopicPermissions }),
  ],
  providers: [
    TopicsService,
    TopicByIdPipe,

    IsTopicExistValidator,
    IsNameUniqueValidator,
  ],
  controllers: [TopicsController],
  exports: [TopicsService],
})
export class TopicsModule {}
