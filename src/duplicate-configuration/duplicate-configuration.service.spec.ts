import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateConfigurationService } from './duplicate-configuration.service';

describe('DuplicateConfigurationService', () => {
  let service: DuplicateConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DuplicateConfigurationService],
    }).compile();

    service = module.get<DuplicateConfigurationService>(DuplicateConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
