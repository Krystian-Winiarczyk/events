import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { BaseController } from 'src/base/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { RoleGuard } from '../../../../guard/role/role.guard';
import { Competition } from "../../../../typeorm/entities/Competition";
import { CompetitionService } from "../../service/competition/competition.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/settings/competitions')
export class CompetitionController extends BaseController<Competition> {
    constructor(private competitionService: CompetitionService) {
        super(competitionService)
    }
}
