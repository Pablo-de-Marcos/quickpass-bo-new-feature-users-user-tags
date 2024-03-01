import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  let appServiceMock = {
    health: jest.fn(async () => ({ status: 'Healthy' })),
    connectDb: jest.fn(async () => ({})),
    getCacheValue: jest.fn(async (collName) => ({})),
    consult: jest.fn(async (collName) => ({})),
    connectFtp: jest.fn(async () => ({})),
    put: jest.fn(async (from, to) => ({})),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appServiceMock }, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return { status: \'Healthy\' }', async () => {
      let result = await appController.getHealth();

      expect(appServiceMock.health).toBeCalled();
      expect(result).toBeDefined();
      expect(result.status).toBeDefined();
      expect(result.status).toBe('Healthy');
    });
  });

  describe('job', () => {
    it('should return { message: \'ok\' }', async () => {
      let result = await appController.postJob();

      expect(appServiceMock.connectDb).toBeCalledTimes(1);
      expect(appServiceMock.getCacheValue).toBeCalledTimes(2);
      expect(appServiceMock.connectFtp).toBeCalledTimes(1);
      expect(appServiceMock.put).toBeCalledTimes(2);

      expect(result).toBeDefined();
      expect(result.message).toBeDefined();
      expect(result.message).toBe('ok');
    });
  });
});
