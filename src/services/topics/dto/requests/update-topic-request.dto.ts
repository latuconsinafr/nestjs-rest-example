import { IntersectionType } from '@nestjs/swagger';
import { Topic } from '../../entities/topic.entity';
import { TopicIdParam } from '../params/topic-id.param';
import { CreateTopicRequest } from './create-topic-request.dto';

/**
 * Defines the DTO that carries data to update a topic.
 *
 * @usageNotes
 * This DTO intersect {@link TopicIdParam} with {@link CreateTopicRequest}.
 */
export class UpdateTopicRequest extends IntersectionType(
  TopicIdParam,
  CreateTopicRequest,
) {
  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `Topic` entity
   */
  static toEntity(request: UpdateTopicRequest): Topic {
    return new Topic(request);
  }
}
