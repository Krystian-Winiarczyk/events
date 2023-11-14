import { Event } from 'src/typeorm/entities/Event';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controller/events/events.controller';
import { EventsService } from './service/events/events.service';
import { EventCompetitionExcelFieldDraftController } from './controller/event-competition-excel-field-draft/event-competition-excel-field-draft.controller';
import { EventCompetitionExcelFieldDraftService } from './service/event-competition-excel-field-draft/event-competition-excel-field-draft.service';
import {EventCompetitionExcelFieldDraft} from "../../typeorm/entities/EventCompetitionExcelFieldDraft";

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventCompetitionExcelFieldDraft])],
  providers: [EventsService, EventCompetitionExcelFieldDraftService],
  controllers: [EventsController, EventCompetitionExcelFieldDraftController]
})
export class EventsModule {}
