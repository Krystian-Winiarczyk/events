import { Competition } from './Competition';
import { Event } from './Event';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { EventRegistration } from './EventRegistration';

@Entity({ name: 'event_competitions' })
export class EventCompetition extends BaseEntity {
    @Column({ nullable: false, default: 0 })
    pricePerPet: number

    @Column({ nullable: false, default: 0 })
    competitorsLimit: number

    @ManyToOne(() => Competition, (competition) => competition.eventCompetitions)
    @JoinTable()
    competition: Competition

    @ManyToOne(() => Event, (event) => event.eventCompetitions)
    @JoinTable()
    event: Event

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.eventCompetition)
    @JoinTable()
    eventRegistrations: EventRegistration[]
}
