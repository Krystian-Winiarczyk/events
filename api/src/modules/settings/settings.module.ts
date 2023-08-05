import { Module } from '@nestjs/common';
import { CompetitionController } from './controller/competition/competition.controller';
import { CompetitionService } from './service/competition/competition.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Competition} from "../../typeorm/entities/Competition";
import {Sponsor} from "../../typeorm/entities/Sponsor";
import { SponsorController } from './controller/sponsor/sponsor.controller';
import { SponsorService } from './service/sponsor/sponsor.service';

@Module({
  controllers: [CompetitionController, SponsorController],
  imports: [TypeOrmModule.forFeature([Competition, Sponsor])],
  providers: [CompetitionService, SponsorService]
})
export class SettingsModule {}
