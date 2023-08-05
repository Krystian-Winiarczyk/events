import {Entity, Column, JoinColumn, OneToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { File } from "./File";

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
    avatar: File
}
