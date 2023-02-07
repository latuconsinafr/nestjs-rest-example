import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';

/**
 * Decorator that set a specified route path or controller or any below method to be accessible
 * controlled by {@link LocalAuthGuard}.
 *
 * @returns The `UseGuards(LocalAuthGuard)` decorator.
 */
export const UseLocalAuth = () => UseGuards(LocalAuthGuard);
