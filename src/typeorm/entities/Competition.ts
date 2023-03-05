import { EventCompetition } from './EventCompetition';
import { CompetitionLevel } from './CompetitionLevel';
import { Event } from './Event';
import { Entity, Column, JoinTable, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'competitions' })
export class Competition extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(() => EventCompetition, (eventCompetition) => eventCompetition.competition)
    @JoinTable()
    eventCompetitions: EventCompetition[]

    @OneToMany(() => CompetitionLevel, (competitionLevel) => competitionLevel.competition)
    @JoinTable()
    competitionLevels: CompetitionLevel[]
}
