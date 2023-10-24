import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BaseService} from "../../../../base/BaseService";
import {Competition} from "../../../../typeorm/entities/Competition";
@Injectable()
export class CompetitionService extends BaseService<Competition>{
    constructor(@InjectRepository(Competition) private competitionRepository: Repository<Competition>) {
        super(competitionRepository, { group: true })
    }
}
