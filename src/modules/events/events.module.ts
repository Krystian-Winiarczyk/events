import { Event } from 'src/typeorm/entities/Event';
import { CompetitionLevel } from './../../typeorm/entities/CompetitionLevel';
import { EventCompetition } from './../../typeorm/entities/EventCompetition';
import { Module } from '@nestjs/common';
import { CompetitionService } from './service/competition/competition.service';
import { EventService } from './service/event/event.service';
import { EventController } from './controller/event/event.controller';
import { CompetitionController } from './controller/competition/competition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from 'src/typeorm/entities/Competition';
import { CompetitionLevelController } from './controller/competition-level/competition-level.controller';
import { CompetitionLevelService } from './service/competition-level/competition-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventCompetition, CompetitionLevel, Competition])],
  providers: [CompetitionService, EventService, CompetitionLevelService],
  controllers: [EventController, CompetitionController, CompetitionLevelController]
})
export class EventsModule {}
