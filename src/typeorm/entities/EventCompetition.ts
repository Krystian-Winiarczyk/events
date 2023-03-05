import { Competition } from './Competition';
import { Event } from './Event';
import { Entity, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'event_competitions' })
export class EventCompetition extends BaseEntity {
    @ManyToOne(() => Competition, (competition) => competition.eventCompetitions)
    @JoinTable()
    competition: Competition

    @ManyToOne(() => Event, (event) => event.eventCompetitions)
    @JoinTable()
    event: Event
}
