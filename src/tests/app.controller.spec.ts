import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { AppController } from '../app.controller';
import { mockedLogger } from '../common/utils/mocks/logger.mock';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: PinoLogger, useValue: mockedLogger }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when index is called', () => {
    it('should return null', () => {
      expect(appController.index()).toBe(null);
    });
  });

  describe('when getDocs is called', () => {
    let version: string;

    describe('and called with version other than 5', () => {
      beforeEach(() => {
        version = '1';
      });

      it('should return null', () => {
        expect(appController.getDocs(version)).toStrictEqual({
          url: 'https://docs.nestjs.com',
        });
      });
    });

    describe('and called with version 5', () => {
      beforeEach(() => {
        version = '5';
      });

      it('should return null', () => {
        expect(appController.getDocs(version)).toStrictEqual({
          url: 'https://docs.nestjs.com/v5/',
        });
      });
    });
  });
});
