import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { APP_NAME } from './common/constants/app.constant';

/**
 * Defines the application controller.
 */
@Controller()
export class AppController {
  private welcomeHtmlString = `<h2 style="position: absolute; top: 50%; left: 50%; -moz-transform: translateX(-50%) translateY(-50%); -webkit-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%);"><span>Welcome to ${APP_NAME}!</span></h2>`;

  /**
   * Index page endpoint.
   *
   * @returns A welcome string in html format.
   */
  @Get()
  index(): string {
    return this.welcomeHtmlString;
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
