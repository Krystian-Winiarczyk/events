import { Injectable } from '@nestjs/common';
import {BaseService} from "../../../../base/BaseService";
import {EventCompetitionExcelFieldDraft} from "../../../../typeorm/entities/EventCompetitionExcelFieldDraft";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class EventCompetitionExcelFieldDraftService extends BaseService<EventCompetitionExcelFieldDraft>{
    constructor(@InjectRepository(EventCompetitionExcelFieldDraft) private eventCompetitionExcelFieldDraft: Repository<EventCompetitionExcelFieldDraft>) {
        super(eventCompetitionExcelFieldDraft, {
            userEventCompetition: {
                eventCompetition: true,
                userPet: true,
                userProfile: true,
            },
            competitionExcelField: true
        });
    }
}
