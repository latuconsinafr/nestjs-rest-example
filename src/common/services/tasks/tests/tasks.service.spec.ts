import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TasksService } from '../tasks.service';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  describe('when handleCron is called', () => {
    const loggerDebugSpy = jest.spyOn(Logger.prototype, 'debug');

    it('should debug the message', () => {
      tasksService.handleCron();

      expect(loggerDebugSpy).toBeCalledTimes(1);
    });
  });
});
