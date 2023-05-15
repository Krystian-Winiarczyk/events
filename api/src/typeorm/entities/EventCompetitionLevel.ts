import { Competition } from './Competition';
import { Event } from './Event';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { EventRegistration } from './EventRegistration';
import {CompetitionLevel} from "./CompetitionLevel";

@Entity({ name: 'event_competition_levels' })
export class EventCompetitionLevel extends BaseEntity {
    @Column({ nullable: false, default: 0 })
    pricePerPet: number

    @Column({ nullable: false, default: 0 })
    competitorsLimit: number

    @ManyToOne(() => CompetitionLevel, (competitionLevel) => competitionLevel.eventCompetitions)
    @JoinTable()
    competitionLevel: CompetitionLevel

    @ManyToOne(() => Event, (event) => event.eventCompetitions)
    @JoinTable()
    event: Event

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.eventCompetition)
    @JoinTable()
    eventRegistrations: EventRegistration[]
}
