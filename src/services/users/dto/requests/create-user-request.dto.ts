import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRole } from '../../../../common/enums/user-role.enum';
import { User } from '../../entities/user.entity';

/**
 * Defines the DTO that carries data to create a user.
 *
 * @usageNotes
 * The CreateUserRequest contains user attribute:
 * - `firstName`: The first name of user
 * - `lastName`: The last name of user
 * - `username`: The username of user
 * - `password`: The password of user
 * - `roles`: The roles of user
 * - `description`: The description of user
 */
export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `User` entity
   */
  static toEntity(request: CreateUserRequest): User {
    return new User(request);
  }
}
