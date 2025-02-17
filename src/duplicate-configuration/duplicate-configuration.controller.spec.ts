import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateConfigurationController } from './duplicate-configuration.controller';

describe('DuplicateConfigurationController', () => {
  let controller: DuplicateConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DuplicateConfigurationController],
    }).compile();

    controller = module.get<DuplicateConfigurationController>(DuplicateConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
