import { Competition } from './Competition';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'competition_levels' })
export class CompetitionLevel extends BaseEntity {
    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true })
    regulationUrl: string

    @ManyToOne(() => Competition, (competition) => competition.competitionLevels, { onDelete: 'CASCADE' })
    @JoinTable()
    competition: Competition
}
