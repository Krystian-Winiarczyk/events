import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompetitionLevel } from 'src/typeorm/entities/CompetitionLevel';
import { CreateCompetitionLevelDto, UpdateCompetitionLevelDto } from '../../dtos/CompetitionLevel.dto';

@Injectable()
export class CompetitionLevelService {
    constructor(
        @InjectRepository(CompetitionLevel) private competitionLevelRepository: Repository<CompetitionLevel>,
    ) { }

    async findLevels() {
        return await this.competitionLevelRepository.find({
            relations: {
                competition: true
            }
        })
    }

    async findCompetitionLevel(competitionId: number) {
        return await this.competitionLevelRepository.find({
            where: {
                competition: {
                    id: competitionId
                }
            },
        })
    }

    async createCompetitionLevel(competitionLevelDetails: CreateCompetitionLevelDto) {
        const { competition, ...competitionLevelDetail } = competitionLevelDetails
        const newLevel = this.competitionLevelRepository.create({
            ...competitionLevelDetail,
            competition: <any> competition,
        })

        return await this.competitionLevelRepository.save(newLevel)
    }

    async updateCompetitionLevel(id: number, competitionLevelDetails: UpdateCompetitionLevelDto) {
        const { competition, ...competitionLevelDetail } = competitionLevelDetails
        const updatePayload: UpdateCompetitionLevelDto = { ...competitionLevelDetail }

        if (competition) updatePayload.competition = <any> competition
        return await this.competitionLevelRepository.update({ id }, { ...updatePayload })
    }

    async deleteCompetitionLevel(id: number) {
        return await this.competitionLevelRepository.delete({ id })
    }
}
