import { Test, TestingModule } from '@nestjs/testing';
import { UserEventCompetitionsService } from './user-event-competitions.service';

describe('UserEventCompetitionsService', () => {
  let service: UserEventCompetitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEventCompetitionsService],
    }).compile();

    service = module.get<UserEventCompetitionsService>(UserEventCompetitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
