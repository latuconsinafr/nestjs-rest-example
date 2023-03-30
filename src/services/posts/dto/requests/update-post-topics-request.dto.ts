import { IntersectionType, PickType } from '@nestjs/swagger';
import { TopicIdParam } from '../../../topics/dto/params/topic-id.param';
import { CreatePostRequest } from './create-post-request.dto';

/**
 * Defines the DTO that carries data to update a post topics.
 *
 * @usageNotes
 * This DTO intersect {@link TopicIdParam} with {@link CreatePostRequest} with picked `topicIds` attribute.
 */
export class UpdatePostTopicsRequest extends IntersectionType(
  TopicIdParam,
  PickType(CreatePostRequest, ['topicIds'] as const),
) {}
