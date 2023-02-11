import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Defines the DTO that carries signed in user data.
 *
 * @usageNotes
 * The SignInResponse contains user attribute:
 * - `accessToken`: The access token that used in authentication
 * - `expiresIn`: The access token expiration
 */
export default class SignInResponse {
  @ApiProperty({
    description: 'The access token that used in authentication',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOjIsImlhdCI6MTY3NjA5MzA5MCwiZXhwIjoxNjc2MTc5NDkwfQ.MhTZVDjFIGBQH2Z126iRT7l_nNCX8AvrsuALAn5qjeX',
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'The access token expiration',
    example: '24h',
  })
  expiresIn?: string | number | undefined;
}
