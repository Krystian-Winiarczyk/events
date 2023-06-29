import { EventCompetitionLevel } from './EventCompetitionLevel';
import { Pet } from 'src/typeorm/entities/Pet';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { EventRegistrationStatuses } from 'src/constants/EventRegistration';

@Entity({ name: 'event_registrations' })
export class EventRegistration extends BaseEntity {

    @Column('enum', { default: EventRegistrationStatuses.NEW, enum: EventRegistrationStatuses })
    status: EventRegistrationStatuses

    @ManyToOne(() => UserProfile)
    @JoinTable()
    userProfile: UserProfile

    @ManyToOne(() => Pet)
    @JoinTable()
    pet: Pet

    @ManyToOne(() => EventCompetitionLevel)
    @JoinTable()
    eventCompetition: EventCompetitionLevel
}