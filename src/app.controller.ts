import { Controller, Get, Query, Redirect } from '@nestjs/common';

/**
 * Defines the application controller.
 */
@Controller()
export class AppController {
  /**
   * Index page endpoint.
   *
   * @returns A welcome string in html format.
   */
  @Get()
  index(): null {
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
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }

    return { url: 'https://docs.nestjs.com' };
  }
}
