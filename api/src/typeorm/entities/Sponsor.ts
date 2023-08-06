import {Entity, Column, JoinColumn, OneToOne, ManyToMany} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { File } from "./File";
import { Event } from "./Event";

@Entity({ name: 'sponsors' })
export class Sponsor extends BaseEntity {
    /**
     *  Sponsor description
     * @returns {text} description
     */
    @Column({ nullable: false })
    name: string;

    /**
     *  Sponsor description
     * @returns {text} description
     */
    @Column({ nullable: true, type: 'text' })
    description: string

    /**
     *  Sponsor site url
     * @returns {string} url
     */
    @Column({ nullable: true })
    url: string

    /**
     *  Sponsor images
     * @returns {File} images
     */
    @OneToOne(() => File, file => file.sponsor, { onDelete: 'CASCADE' })
    @JoinColumn()
    logo: File

    /**
     *  Sponsor events
     * @returns {Event[]} sponsor event
     */
    @ManyToMany(() => Event, (event) => event.sponsors)
    events: Event[]
}
