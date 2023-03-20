import { IntersectionType, OmitType } from '@nestjs/swagger';
import { Post } from '../../entities/post.entity';
import { PostIdParam } from '../params/post-id.param.dto';
import { CreatePostRequest } from './create-post-request.dto';

/**
 * Defines the DTO that carries data to update a post.
 *
 * @usageNotes
 * This DTO intersect {@link PostIdParam} with {@link CreatePostRequest} with omitted `topicIds` attribute.
 */
export class UpdatePostRequest extends IntersectionType(
  PostIdParam,
  OmitType(CreatePostRequest, ['topicIds'] as const),
) {
  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `Post` entity
   */
  static toEntity(request: UpdatePostRequest): Post {
    return new Post(request);
  }
}
