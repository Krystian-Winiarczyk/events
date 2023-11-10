import { Module } from '@nestjs/common';
import { CompetitionController } from './controller/competition/competition.controller';
import { CompetitionService } from './service/competition/competition.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Competition} from "../../typeorm/entities/Competition";
import {Sponsor} from "../../typeorm/entities/Sponsor";
import { SponsorController } from './controller/sponsor/sponsor.controller';
import { SponsorService } from './service/sponsor/sponsor.service';
import { GroupService } from './service/group/group.service';
import { GroupController } from './controller/group/group.controller';
import {Group} from "../../typeorm/entities/Group";
import { CompetitionExcelFieldsController } from './controller/competition-excel-fields/competition-excel-fields.controller';
import { CompetitionExcelFieldsService } from './service/competition-excel-fields/competition-excel-fields.service';
import {CompetitionExcelField} from "../../typeorm/entities/CompetitionExcelField";

@Module({
  controllers: [CompetitionController, SponsorController, GroupController, CompetitionExcelFieldsController],
  imports: [TypeOrmModule.forFeature([Competition, Sponsor, Group, CompetitionExcelField])],
  providers: [CompetitionService, SponsorService, GroupService, CompetitionExcelFieldsService]
})
export class SettingsModule {}
