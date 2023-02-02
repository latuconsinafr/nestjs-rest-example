/**
 * Defines authenticated response interface.
 */
export interface AuthResponse {
  accessToken: string;
  expiresIn?: string | number | undefined;
}
