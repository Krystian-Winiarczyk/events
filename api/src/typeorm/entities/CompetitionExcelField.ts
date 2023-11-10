import {Entity, Column, ManyToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {Group} from "./Group";
import {ExcelFieldType} from "../../constants/ExcelFieldType";
import {Competition} from "./Competition";

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
}
