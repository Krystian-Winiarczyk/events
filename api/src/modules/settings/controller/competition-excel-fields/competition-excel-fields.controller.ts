import { Controller } from '@nestjs/common';
import {BaseController} from "../../../../base/BaseController";
import {CompetitionExcelField} from "../../../../typeorm/entities/CompetitionExcelField";
import {CompetitionExcelFieldsService} from "../../service/competition-excel-fields/competition-excel-fields.service";

@Controller('api/settings/competition-excel-fields')
export class CompetitionExcelFieldsController extends BaseController<CompetitionExcelField>{
    constructor(private competitionExcelFieldsService: CompetitionExcelFieldsService) {
        super(competitionExcelFieldsService);
    }

}
