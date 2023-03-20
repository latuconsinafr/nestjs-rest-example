import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { AppController } from '../app.controller';
import { mockedPinoLogger } from '../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { Request } from 'express';

describe(AppController.name, () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: PinoLogger, useValue: mockedPinoLogger }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${AppController.prototype.index.name} is called`, () => {
    it('should return undefined', () => {
      expect(appController.index()).toBeUndefined();
    });
  });

  describe(`when ${AppController.prototype.getDocs.name} is called`, () => {
    let request: Request;
    let version: string;

    beforeEach(() => {
      request = {
        protocol: 'https',
        get: () => 'localhost:8080',
      } as any;
    });

    describe('and called with version 1', () => {
      beforeEach(() => {
        version = '1';
      });

      it('should return the version 1 of docs url', () => {
        expect(appController.getDocs(request, version)).toStrictEqual({
          url: 'https://localhost:8080/docs/v1',
        });
      });
    });

    describe('and called with version other than 1', () => {
      beforeEach(() => {
        version = '5';
      });

      it('should return the version 5 of docs url', () => {
        expect(appController.getDocs(request, version)).toStrictEqual({
          url: `https://localhost:8080/docs/v5`,
        });
      });
    });
  });
});
