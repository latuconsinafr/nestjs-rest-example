import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { TimestampResponse } from '../../../../common/dto/responses/timestamp-response.dto';
import { topicsData } from '../../../../database/data/topics.data';
import { TopicIdParam } from '../params/topic-id.param';

/**
 * Defines the DTO that carries data representing a topic.
 *
 * @usageNotes
 * The DTO intersect {@link TopicIdParam} with {@link TimestampResponse}.
 *
 * The TopicResponse also contains topic attribute:
 * - `name`: The name of topic
 */
export class TopicResponse extends IntersectionType(
  TopicIdParam,
  TimestampResponse,
) {
  @ApiProperty({
    description: 'The name of topic',
    example: topicsData[0].name,
  })
  name: string;
}
