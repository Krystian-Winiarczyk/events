import { Competition } from './Competition';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'competition_levels' })
export class CompetitionLevel extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(() => Competition, (competition) => competition.competitionLevels)
    @JoinTable()
    competition: Competition
}
