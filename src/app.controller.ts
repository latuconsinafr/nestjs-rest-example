import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

/**
 * Defines the application controller.
 */
@Controller()
export class AppController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   */
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AppController.name);
  }

  /**
   * Index page endpoint.
   *
   * @returns A welcome string in html format.
   */
  @Get()
  index(): null {
    this.logger.info(`Try to call ${AppController.prototype.index.name}`);

    return null;
  }

  /**
   * Application documentation endpoint.
   *
   * @param version The documentation version
   *
   * @returns The documentation link with specified version if exists, otherwise redirect to the default documentation.
   */
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string): { url: string } {
    this.logger.info(`Try to call ${AppController.prototype.getDocs.name}`);

    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }

    return { url: 'https://docs.nestjs.com' };
  }
}
