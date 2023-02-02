import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Defines auth guard that matches the strategy named `jwt`.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
