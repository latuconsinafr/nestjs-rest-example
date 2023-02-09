import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Defines the DTO that carries data to sign in a user.
 *
 * @usageNotes
 * The CreateUserRequest contains user attribute:
 * - `username`: The username of user
 * - `password`: The password of user
 */
export default class SignInRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The username of user.',
    example: 'user',
  })
  username: string;

  @ApiProperty({
    description: 'The password of user.',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
