import { Injectable } from '@nestjs/common';
import { BaseService } from "../../../../base/BaseService";
import { Sponsor } from "../../../../typeorm/entities/Sponsor";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SponsorService extends BaseService<Sponsor> {
    constructor(@InjectRepository(Sponsor) private sponsorRepository: Repository<Sponsor>) {
        super(sponsorRepository);
    }
}
