import { Competition } from './Competition';
import { Entity, Column, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { EventCompetitionLevel } from './EventCompetitionLevel';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true, default: 'Polska' })
    locationCountry: string

    @Column({ nullable: false })
    locationCity: string

    @Column({ nullable: false })
    locationPostalCode: string

    @Column({ nullable: false })
    locationStreet: string

    @Column({ nullable: true })
    locationNumber: string

    @Column({ type: 'text', nullable: true })
    locationDescription: string

    @OneToMany(() => EventCompetitionLevel, (eventCompetition) => eventCompetition.event)
    @JoinTable()
    eventCompetitions: EventCompetitionLevel[]
}
