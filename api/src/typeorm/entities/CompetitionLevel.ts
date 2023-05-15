import { Competition } from './Competition';
import {Entity, Column, ManyToOne, JoinTable, OneToMany} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {EventCompetitionLevel} from "./EventCompetitionLevel";

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

    @OneToMany(() => EventCompetitionLevel, (eventCompetition) => eventCompetition.competitionLevel)
    @JoinTable()
    eventCompetitions: EventCompetitionLevel[]
}
