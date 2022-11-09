/**
 * Defines the user interface.
 *
 * @usageNotes
 * The CreateUserDto contains user attribute:
 * - `id`: The id of user
 * - `username`: The username of user
 * - `password`: The password of user
 * - `description`: The description of user
 */
export interface User {
  id: number;
  username: string;
  password: string;
  description?: string;
}
