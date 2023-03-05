import { Competition } from './Competition';
import { Entity, Column, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { EventCompetition } from './EventCompetition';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(() => EventCompetition, (eventCompetition) => eventCompetition.event)
    @JoinTable()
    eventCompetitions: EventCompetition[]
}
