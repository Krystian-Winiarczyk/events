import { Controller } from '@nestjs/common';
import {BaseController} from "../../../../base/BaseController";
import {UserEventCompetition} from "../../../../typeorm/entities/UserEventCompetition";
import {UserEventCompetitionsService} from "../../service/user-event-competitions/user-event-competitions.service";

@Controller('api/user/event/competitions')
export class UserEventCompetitionsController extends BaseController<UserEventCompetition> {
    constructor(private userEventCompetitionsService: UserEventCompetitionsService) {
        super(userEventCompetitionsService);
    }

}
