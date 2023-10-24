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

@Module({
  controllers: [CompetitionController, SponsorController, GroupController],
  imports: [TypeOrmModule.forFeature([Competition, Sponsor, Group])],
  providers: [CompetitionService, SponsorService, GroupService]
})
export class SettingsModule {}
