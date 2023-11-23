import {Entity, Column, ManyToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {Event} from "./Event";
import {CompetitionExcelField} from "./CompetitionExcelField";
import {UserEventCompetition} from "./UserEventCompetition";
import {UserProfile} from "./UserProfile";
import {UserPet} from "./UserPet";

@Entity({ name: 'event_competition_excel_field_draft' })
export class EventCompetitionExcelFieldDraft extends BaseEntity {
    /**
     *  Competition excel field name
     * @returns {string} value
     */
    @Column({ nullable: false })
    value: string

    /**
     * userEventCompetition
     * @returns {UserEventCompetition} userEventCompetition
     */
    @ManyToOne(() => Event, event => event.eventCompetitionExcelFieldDrafts)
    event: Event

    /**
     * userEventCompetition
     * @returns {UserEventCompetition} userEventCompetition
     */
    @ManyToOne(() => UserEventCompetition, userEventCompetition => userEventCompetition.eventCompetitionExcelFieldDrafts)
    userEventCompetition: UserEventCompetition

    /**
     *  competitionExcelField
     * @returns {CompetitionExcelField} competitionExcelField
     */
    @ManyToOne(() => CompetitionExcelField, competitionExcelField => competitionExcelField.eventCompetitionExcelFieldDrafts)
    competitionExcelField: CompetitionExcelField

    /**
     *  Competition excel field name
     * @returns {UserProfile} type
     */
    @ManyToOne(() => UserProfile, userProfile => userProfile.eventCompetitionExcelFieldDrafts)
    userProfile: UserProfile;

    /**
     *  Competition group
     * @returns {UserPet} eventCompetitions
     */
    @ManyToOne(() => UserPet, userPet => userPet.eventCompetitionExcelFieldDrafts)
    userPet: UserPet
}
