import { Injectable } from '@nestjs/common';
import {BaseService} from "../../../../base/BaseService";
import {UserEventCompetition} from "../../../../typeorm/entities/UserEventCompetition";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserEventCompetitionsService extends BaseService<UserEventCompetition>{
    constructor(@InjectRepository(UserEventCompetition) private userEventCompetitionRepository: Repository<UserEventCompetition>) {
        super(userEventCompetitionRepository, {
            eventCompetition: true,
            event: true,
            userPet: {
                avatar: true,
            },
            userProfile: {
                avatar: true,
            },
            user: true,
        });
    }
}
