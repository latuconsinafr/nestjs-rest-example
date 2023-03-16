import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { topicsData } from '../../../../database/data/topics.data';
import { Topic } from '../../entities/topic.entity';

/**
 * Defines the DTO that carries data to create a topic.
 *
 * @usageNotes
 * The CreateTopicRequest contains topic attribute:
 * - `name`: The name of topic
 */
export class CreateTopicRequest {
  @IsNotEmpty()
  @IsString()
  // TODO: Unique validation
  @ApiProperty({
    description: 'The name of topic',
    example: topicsData[0].name,
  })
  name: string;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `Topic` entity
   */
  static toEntity(request: CreateTopicRequest): Topic {
    return new Topic(request);
  }
}
