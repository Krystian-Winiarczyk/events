import { Event } from 'src/typeorm/entities/Event';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controller/events/events.controller';
import { EventsService } from './service/events/events.service';
import { EventCompetitionExcelFieldDraftController } from './controller/event-competition-excel-field-draft/event-competition-excel-field-draft.controller';
import { EventCompetitionExcelFieldDraftService } from './service/event-competition-excel-field-draft/event-competition-excel-field-draft.service';
import {EventCompetitionExcelFieldDraft} from "../../typeorm/entities/EventCompetitionExcelFieldDraft";
import {UserEventCompetitionsService} from "../users/service/user-event-competitions/user-event-competitions.service";
import {CompetitionExcelFieldsService} from "../settings/service/competition-excel-fields/competition-excel-fields.service";
import {UserEventCompetition} from "../../typeorm/entities/UserEventCompetition";
import {CompetitionExcelField} from "../../typeorm/entities/CompetitionExcelField";

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventCompetitionExcelFieldDraft, UserEventCompetition, CompetitionExcelField])],
  providers: [EventsService, EventCompetitionExcelFieldDraftService, UserEventCompetitionsService, CompetitionExcelFieldsService],
  controllers: [EventsController, EventCompetitionExcelFieldDraftController]
})
export class EventsModule {}
