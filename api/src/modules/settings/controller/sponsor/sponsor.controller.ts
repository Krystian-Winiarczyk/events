import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { BaseController } from 'src/base/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { RoleGuard } from '../../../../guard/role/role.guard';
import { Sponsor } from "../../../../typeorm/entities/Sponsor";
import { SponsorService } from "../../service/sponsor/sponsor.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/settings/sponsors')
export class SponsorController extends BaseController<Sponsor> {
    constructor(private sponsorService: SponsorService) {
        super(sponsorService)
    }
}
