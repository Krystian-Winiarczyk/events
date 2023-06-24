import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';

@Entity({ name: 'competitions' })
export class Competition extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ nullable: true })
    regulationUrl: string
}
