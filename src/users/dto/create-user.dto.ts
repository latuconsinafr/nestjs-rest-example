import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Defines the DTO that carries data to create a user.
 */
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  description: string;
}
