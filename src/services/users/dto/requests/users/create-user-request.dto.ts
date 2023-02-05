import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { User } from '../../../entities/user.entity';
import { UserRole } from '../../../enums/user-role.enum';
import { CreateUserProfileRequest } from '../user-profiles/create-user-profile-request.dto';

/**
 * Defines the DTO that carries data to create a user.
 *
 * @usageNotes
 * The CreateUserRequest contains user attribute:
 * - `username`: The username of user
 * - `email`: The email of user
 * - `phone`: The phone of user
 * - `password`: The password of user
 * - `roles`: The roles of user
 */
export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('ID')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => CreateUserProfileRequest) // * ValidateNested() for object should use this type of transformation
  profile: CreateUserProfileRequest;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `User` entity
   */
  static toEntity(request: CreateUserRequest): User {
    const { profile, ...user } = request;

    return new User({
      ...user,
      profile: CreateUserProfileRequest.toEntity(profile),
    });
  }
}
