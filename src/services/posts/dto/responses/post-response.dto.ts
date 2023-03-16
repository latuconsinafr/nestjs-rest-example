import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { TimestampResponse } from '../../../../common/dto/responses/timestamp-response.dto';
import { postsData } from '../../../../database/data/posts.data';
import { topicsData } from '../../../../database/data/topics.data';
import { usersData } from '../../../../database/data/users.data';
import { TopicResponse } from '../../../topics/dto/responses/topic-response.dto';
import { PostIdParam } from '../params/post-id.param.dto';

/**
 * Defines the DTO that carries data representing a post.
 *
 * @usageNotes
 * The DTO intersect {@link PostIdParam} with {@link TimestampResponse}.
 *
 * The PostResponse also contains post attribute:
 * - `content`: The content of post
 * - `category`: The category of post
 * - `authorId`: The author id of post
 */
export class PostResponse extends IntersectionType(
  PostIdParam,
  TimestampResponse,
) {
  @ApiProperty({
    description: 'The content of post',
    example: postsData[0].content,
  })
  content: string;

  @ApiProperty({
    description: 'The topic ids of post',
    example: [topicsData[0].id, topicsData[1].id],
  })
  topicIds: string[];

  @ApiProperty({
    description: 'The author id of post',
    example: usersData[0].id,
  })
  authorId: string;

  @ApiProperty({
    description: 'The topics of post',
    type: [TopicResponse],
  })
  topics: TopicResponse[];
}
