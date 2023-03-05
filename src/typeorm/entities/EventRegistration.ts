import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity({ name: 'event_registrations' })
export class EventRegistration extends BaseEntity {
    @Column()
    name: string;

    // @ManyToOne(() => User, (user) => user.pets)
    // @JoinTable()
}
