import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

/**
 * Defines the tasks service that responsible for all application tasks scheduling.
 */
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  /**
   * The handle cron method.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.logger.debug('Called every minute');
  }
}
