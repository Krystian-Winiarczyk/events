import {Entity, Column, ManyToOne, OneToMany, JoinTable} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {Group} from "./Group";
import {ExcelFieldType} from "../../constants/ExcelFieldType";
import {Competition} from "./Competition";
import {EventCompetitionExcelFieldDraft} from "./EventCompetitionExcelFieldDraft";
import {UserPet} from "./UserPet";

@Entity({ name: 'competition_excel_fields' })
export class CompetitionExcelField extends BaseEntity {
    /**
     *  Competition excel field name
     * @returns {string} name
     */
    @Column({ nullable: false })
    name: string;

    /**
     *  Competition excel field name
     * @returns {ExcelFieldType} type
     */
    @Column('enum', { default: ExcelFieldType.VALUE, enum: ExcelFieldType })
    type: ExcelFieldType;

    /**
     *  Competition group
     * @returns {Group} eventCompetitions
     */
    @ManyToOne(() => Competition, competition => competition.competitionExcelFields)
    competition: Competition

    /**
     *  List of all assigned event competition excel field draft
     * @returns {EventCompetitionExcelFieldDraft[]} pets
     */
    @OneToMany(() => EventCompetitionExcelFieldDraft, (eventCompetitionExcelFieldDraft) => eventCompetitionExcelFieldDraft.competitionExcelField, { onDelete: 'CASCADE' })
    @JoinTable()
    eventCompetitionExcelFieldDrafts: EventCompetitionExcelFieldDraft[]
}
