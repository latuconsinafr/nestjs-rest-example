import { Module } from '@nestjs/common';
import { CaslModule } from './casl/casl.module';
import { TasksModule } from './tasks/tasks.module';

/**
 * Defines the application common services module.
 *
 * @usageNotes
 * This common service module contains modules as follow:
 * - {@link TasksModule}: The module that responsible for task scheduling
 * - {@link CaslModule}: The module that responsible for CASL
 */
@Module({
  imports: [TasksModule, CaslModule],
})
export class CommonServicesModule {}
