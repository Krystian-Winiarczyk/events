import { CompetitionLevel } from './../../typeorm/entities/CompetitionLevel';
import { EventCompetition } from './../../typeorm/entities/EventCompetition';
import { Module } from '@nestjs/common';
import { CompetitionService } from './service/competition/competition.service';
import { EventService } from './service/event/event.service';
import { EventController } from './controller/event/event.controller';
import { CompetitionController } from './controller/competition/competition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from 'src/typeorm/entities/Competition';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventCompetition, CompetitionLevel, Competition])],
  providers: [CompetitionService, EventService],
  controllers: [EventController, CompetitionController]
})
export class EventsModule {}
