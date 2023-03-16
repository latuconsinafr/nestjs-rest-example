import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { postsData } from '../../../../database/data/posts.data';
import { topicsData } from '../../../../database/data/topics.data';
import { Post } from '../../entities/post.entity';

/**
 * Defines the DTO that carries data to create a post.
 *
 * @usageNotes
 * The CreatePostRequest contains post attribute:
 * - `content`: The content of post
 * - `topicIds`: The topic ids of post
 */
export class CreatePostRequest {
  @IsNotEmpty()
  @IsString()
  @Length(4, 250)
  @ApiProperty({
    description: 'The content of post',
    example: postsData[0].content,
  })
  content: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  @ApiProperty({
    description: 'The topic ids of post',
    isArray: true,
    example: [topicsData[0].id, topicsData[1].id],
  })
  topicIds: string[];

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `Post` entity
   */
  static toEntity(request: CreatePostRequest): Post {
    return new Post(request);
  }
}
