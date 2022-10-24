import { NextFunction } from 'express';

// * Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Request...');
  next();
}

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: (error?: any) => void) {
//     console.log('Request...');
//     next();
//   }
// }
