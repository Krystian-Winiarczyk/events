import {Column, Entity, ManyToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {Event} from "./Event";
import {EventCompetition} from "./EventCompetition";
import {UserPet} from "./UserPet";
import {UserProfile} from "./UserProfile";
import {User} from "./User";

@Entity({ name: 'user_event_competitions' })
export class UserEventCompetition extends BaseEntity {
    @ManyToOne(() => EventCompetition, eventCompetition => eventCompetition.userEventCompetitions)
    eventCompetition: EventCompetition

    @ManyToOne(() => Event, event => event.userEventCompetitions)
    event: Event

    @ManyToOne(() => UserPet, pet => pet.userEventCompetitions)
    userPet: UserPet

    @ManyToOne(() => UserProfile, userProfile => userProfile.userEventCompetitions)
    userProfile: UserProfile

    @ManyToOne(() => User, user => user.userEventCompetitions)
    user: User
}
