import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

/**
 * Defines the tasks module.
 */
@Module({
  providers: [TasksService],
})
export class TasksModule {}
