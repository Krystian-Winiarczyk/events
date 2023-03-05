import { CompetitionLevel } from './../../../../typeorm/entities/CompetitionLevel';
import { Competition } from './../../../../typeorm/entities/Competition';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompetitionService {
    constructor(
        @InjectRepository(Competition) private competitionRepository: Repository<Competition>,
        @InjectRepository(CompetitionLevel) private competitionLevelRepository: Repository<CompetitionLevel>
    ) {}

    async findCompetitions() {
        return await this.competitionRepository.find({
            relations: {
                competitionLevels: true
            }
        })
    }

    async findCompetition(id: number) {
        return await this.competitionRepository.findOne({
            where: { id },
            relations: {
                competitionLevels: true
            }
        })
    }

    async createCompetition(competitionDetails: any) {
        const newCompetition = this.competitionRepository.create({ name: competitionDetails.name })

        const newCompetitionLevel = this.competitionLevelRepository.create({
            name: 'Poziom 1',
        })
        await this.competitionLevelRepository.save(newCompetitionLevel)

        newCompetition.competitionLevels = [newCompetitionLevel]
        return await this.competitionRepository.save(newCompetition)
    }

    async updateCompetition(id: number, updateCompetitionDetails: any) {
        return await this.competitionRepository.update({ id }, { ...updateCompetitionDetails })
    }

    async deleteCompetition(id: number) {
        return await this.competitionRepository.delete({ id })
    }
}
