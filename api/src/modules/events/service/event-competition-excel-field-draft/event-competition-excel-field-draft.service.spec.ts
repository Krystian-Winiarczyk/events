import { Test, TestingModule } from '@nestjs/testing';
import { EventCompetitionExcelFieldDraftService } from './event-competition-excel-field-draft.service';

describe('EventCompetitionExcelFieldDraftService', () => {
  let service: EventCompetitionExcelFieldDraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCompetitionExcelFieldDraftService],
    }).compile();

    service = module.get<EventCompetitionExcelFieldDraftService>(EventCompetitionExcelFieldDraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
