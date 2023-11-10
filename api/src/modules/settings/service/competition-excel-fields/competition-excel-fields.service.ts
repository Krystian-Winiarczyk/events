import { Injectable } from '@nestjs/common';
import {BaseService} from "../../../../base/BaseService";
import {Competition} from "../../../../typeorm/entities/Competition";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CompetitionExcelField} from "../../../../typeorm/entities/CompetitionExcelField";

@Injectable()
export class CompetitionExcelFieldsService extends BaseService<CompetitionExcelField> {
    constructor(@InjectRepository(CompetitionExcelField) private competitionExcelFieldsRepository: Repository<CompetitionExcelField>) {
        super(competitionExcelFieldsRepository)
    }
}
