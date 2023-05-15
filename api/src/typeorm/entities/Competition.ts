import { CompetitionLevel } from './CompetitionLevel';
import { Entity, Column, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';

@Entity({ name: 'competitions' })
export class Competition extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true })
    regulationUrl: string

    @OneToMany(() => CompetitionLevel, (competitionLevel) => competitionLevel.competition)
    @JoinTable()
    competitionLevels: CompetitionLevel[]
}
