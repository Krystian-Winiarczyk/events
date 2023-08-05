import { Module } from '@nestjs/common';
import { CompetitionController } from './controller/competition/competition.controller';
import { CompetitionService } from './service/competition/competition.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Competition} from "../../typeorm/entities/Competition";

@Module({
  controllers: [CompetitionController],
  imports: [TypeOrmModule.forFeature([Competition])],
  providers: [CompetitionService]
})
export class SettingsModule {}
