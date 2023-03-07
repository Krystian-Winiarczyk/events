import { EventCompetition } from './EventCompetition';
import { CompetitionLevel } from './CompetitionLevel';
import { Event } from './Event';
import { Entity, Column, JoinTable, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'competitions' })
export class Competition extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true })
    regulationUrl: string

    @OneToMany(() => EventCompetition, (eventCompetition) => eventCompetition.competition)
    @JoinTable()
    eventCompetitions: EventCompetition[]

    @OneToMany(() => CompetitionLevel, (competitionLevel) => competitionLevel.competition)
    @JoinTable()
    competitionLevels: CompetitionLevel[]
}
