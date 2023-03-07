import { ApiProperty, PickType } from '@nestjs/swagger';
import { postsData } from '../../../../database/data/posts.data';
import { usersData } from '../../../../database/data/users.data';
import { PostIdParam } from '../params/post-id.param.dto';

/**
 * Defines the DTO that carries data representing a post.
 *
 * @usageNotes
 * The DTO pick {@link PostIdParam} id attribute.
 *
 * The PostResponse also contains post attribute:
 * - `title`: The title of post
 * - `content`: The content of post
 * - `category`: The category of post
 * - `authorId`: The author id of post
 */
export class PostResponse extends PickType(PostIdParam, ['id'] as const) {
  @ApiProperty({
    description: 'The title of post',
    example: postsData[0].title,
  })
  title: string;

  @ApiProperty({
    description: 'The content of post',
    example: postsData[0].content,
  })
  content: string;

  @ApiProperty({
    description: 'The category of post',
    example: postsData[0].category,
  })
  category: string;

  @ApiProperty({
    description: 'The author id of post',
    example: usersData[0].id,
  })
  authorId: string;
}
