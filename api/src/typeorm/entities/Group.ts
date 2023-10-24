import {Entity, Column, OneToMany} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {EventCompetition} from "./EventCompetition";
import {Competition} from "./Competition";

@Entity({ name: 'groups' })
export class Group extends BaseEntity {
    /**
     *  Group name
     * @returns {text} name
     */
    @Column({ nullable: false })
    name: string;

    /**
     *  Competition eventCompetitions
     * @returns {Competition[]} eventCompetitions
     */
    @OneToMany(() => Competition, competition =>  competition.group)
    competitions: Competition[]
}
