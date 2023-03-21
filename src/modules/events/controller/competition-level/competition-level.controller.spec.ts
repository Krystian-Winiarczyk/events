import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionLevelController } from './competition-level.controller';

describe('CompetitionLevelController', () => {
  let controller: CompetitionLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionLevelController],
    }).compile();

    controller = module.get<CompetitionLevelController>(CompetitionLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
