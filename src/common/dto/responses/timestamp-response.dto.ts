import { ApiProperty } from '@nestjs/swagger';

export class TimestampResponse {
  @ApiProperty({
    description: 'The creation time of data',
    example: '2023-02-11T05:24:50.680Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last updation time of data',
    example: '2023-02-11T05:24:50.680Z',
  })
  updatedAt: Date;
}
