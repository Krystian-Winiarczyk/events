import { Test, TestingModule } from '@nestjs/testing';
import { EventCompetitionExcelFieldDraftController } from './event-competition-excel-field-draft.controller';

describe('EventCompetitionExcelFieldDraftController', () => {
  let controller: EventCompetitionExcelFieldDraftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventCompetitionExcelFieldDraftController],
    }).compile();

    controller = module.get<EventCompetitionExcelFieldDraftController>(EventCompetitionExcelFieldDraftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
