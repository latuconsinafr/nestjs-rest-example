import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
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
