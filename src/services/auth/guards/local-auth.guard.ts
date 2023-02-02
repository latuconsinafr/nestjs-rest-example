import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Defines auth guard that matches the strategy named `local`.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
