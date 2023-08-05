import {Entity, Column, OneToMany, JoinColumn, OneToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {EventCompetition} from "./EventCompetition";
import {File} from "./File";

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

    @Column({ nullable: true, type: 'datetime' })
    eventStartDate: Date;

    @Column({ nullable: false })
    eventDaysCount: number

    @Column({ nullable: true, default: true })
    freeEntrance: boolean

    @Column({ nullable: true })
    mediaUrl: string

    @Column({ type: 'text', nullable: true })
    regulation: string

    @Column({ nullable: true })
    regulationUrl: string

    @OneToMany(() => EventCompetition, eventCompetition =>  eventCompetition.event, { cascade: true })
    eventCompetitions: EventCompetition[]

    /**
     *  Event images
     * @returns {File[]} images
     */
    @OneToMany(() => File, file => file.event, { onDelete: 'CASCADE' })
    images: File[]

    /**
     *  Event banner image
     * @returns {File} banner image
     */
    @OneToOne(() => File, file => file.event, { onDelete: 'CASCADE' })
    @JoinColumn()
    banner: File

    // sponsoring (name, link, logo, opis)

}
