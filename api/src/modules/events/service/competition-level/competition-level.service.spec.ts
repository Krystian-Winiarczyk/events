import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionLevelService } from './competition-level.service';

describe('CompetitionLevelService', () => {
  let service: CompetitionLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionLevelService],
    }).compile();

    service = module.get<CompetitionLevelService>(CompetitionLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
