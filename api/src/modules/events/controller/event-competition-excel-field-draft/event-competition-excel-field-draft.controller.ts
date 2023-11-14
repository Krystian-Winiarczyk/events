import { Controller } from '@nestjs/common';
import {BaseController} from "../../../../base/BaseController";
import {EventCompetitionExcelFieldDraft} from "../../../../typeorm/entities/EventCompetitionExcelFieldDraft";
import {
    EventCompetitionExcelFieldDraftService
} from "../../service/event-competition-excel-field-draft/event-competition-excel-field-draft.service";

@Controller('api/event-competition-excel-field-draft')
export class EventCompetitionExcelFieldDraftController extends BaseController<EventCompetitionExcelFieldDraft>{
    constructor(private eventCompetitionExcelFieldDraftService: EventCompetitionExcelFieldDraftService) {
        super(eventCompetitionExcelFieldDraftService);
    }

}
