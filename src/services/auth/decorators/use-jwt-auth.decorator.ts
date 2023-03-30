import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

/**
 * Decorator that set a specified route path or controller or any below method to be accessible
 * controlled by {@link JwtAuthGuard}.
 *
 * @returns The `UseGuards(JwtAuthGuard)` decorator.
 */
export const UseJwtAuth = () => UseGuards(JwtAuthGuard);
