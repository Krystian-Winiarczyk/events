import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionExcelFieldsController } from './competition-excel-fields.controller';

describe('CompetitionExcelFieldsController', () => {
  let controller: CompetitionExcelFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionExcelFieldsController],
    }).compile();

    controller = module.get<CompetitionExcelFieldsController>(CompetitionExcelFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
