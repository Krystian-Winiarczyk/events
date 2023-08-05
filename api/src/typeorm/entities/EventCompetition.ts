import {Column, Entity, ManyToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {Competition} from "./Competition";
import {Event} from "./Event";

@Entity({ name: 'event_competitions' })
export class EventCompetition extends BaseEntity {
    @ManyToOne(() => Competition, competition => competition.eventCompetitions)
    competition: Competition

    @ManyToOne(() => Event, event => event.eventCompetitions)
    event: Event

    @Column({ nullable: false, default: 100 })
    userLimit: number

    @Column({ nullable: false, default: 0 })
    pricePerStart: number
}
