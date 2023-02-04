import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants';

/**
 * Decorator that set a specified route path or controller or any below method to be accessible publicly.
 *
 * @returns The truth is public key
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
