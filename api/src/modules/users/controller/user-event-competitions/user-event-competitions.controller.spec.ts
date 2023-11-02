import { Test, TestingModule } from '@nestjs/testing';
import { UserEventCompetitionsController } from './user-event-competitions.controller';

describe('UserEventCompetitionsController', () => {
  let controller: UserEventCompetitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEventCompetitionsController],
    }).compile();

    controller = module.get<UserEventCompetitionsController>(UserEventCompetitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
