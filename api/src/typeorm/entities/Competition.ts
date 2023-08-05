import {Entity, Column, OneToMany} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {EventCompetition} from "./EventCompetition";

@Entity({ name: 'competitions' })
export class Competition extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true })
    regulationUrl: string

    @OneToMany(() => EventCompetition, eventCompetition =>  eventCompetition.competition)
    eventCompetitions: EventCompetition[]
}
