import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionExcelFieldsService } from './competition-excel-fields.service';

describe('CompetitionExcelFieldsService', () => {
  let service: CompetitionExcelFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionExcelFieldsService],
    }).compile();

    service = module.get<CompetitionExcelFieldsService>(CompetitionExcelFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
