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

    async createCompetitionLevel(competitionId: number, competitionLevelDetails: CreateCompetitionLevelDto) {
        const newLevel = this.competitionLevelRepository.create({
            ...competitionLevelDetails,
            competition: <any> competitionId,
        })

        return await this.competitionLevelRepository.save(newLevel)
    }

    async updateCompetitionLevel(id: number, competitionLevelDetails: UpdateCompetitionLevelDto) {
        return await this.competitionLevelRepository.update({ id }, { ...competitionLevelDetails })
    }

    async deleteCompetitionLevel(id: number) {
        return await this.competitionLevelRepository.delete({ id })
    }
}
