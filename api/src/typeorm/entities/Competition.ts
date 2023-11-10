import {Entity, Column, OneToMany, ManyToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {EventCompetition} from "./EventCompetition";
import {Group} from "./Group";
import {CompetitionExcelField} from "./CompetitionExcelField";

@Entity({ name: 'competitions' })
export class Competition extends BaseEntity {
    /**
     *  Competition name
     * @returns {text} name
     */
    @Column({ nullable: false })
    name: string;

    /**
     *  Competition description
     * @returns {text} description
     */
    @Column({ type: 'text', nullable: true })
    description: string

    /**
     *  Competition regulationUrl
     * @returns {text} regulationUrl
     */
    @Column({ nullable: true })
    regulationUrl: string

    /**
     *  Competition eventCompetitions
     * @returns {EventCompetition[]} eventCompetitions
     */
    @OneToMany(() => EventCompetition, eventCompetition =>  eventCompetition.competition)
    eventCompetitions: EventCompetition[]

    /**
     *  Competition competitionExcelFields
     * @returns {CompetitionExcelField[]} competitionExcelFields
     */
    @OneToMany(() => CompetitionExcelField, competitionExcelField =>  competitionExcelField.competition)
    competitionExcelFields: CompetitionExcelField[]

    /**
     *  Competition group
     * @returns {Group} eventCompetitions
     */
    @ManyToOne(() => Group, group => group.competitions)
    group: Group
}
