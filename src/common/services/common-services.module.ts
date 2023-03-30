import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

/**
 * Defines the application common services module.
 *
 * @usageNotes
 * This common service module contains modules as follow:
 * - {@link TasksModule}: The module that responsible for task scheduling
 */
@Module({
  imports: [TasksModule],
})
export class CommonServicesModule {}
