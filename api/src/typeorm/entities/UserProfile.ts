import { EventRegistration } from './EventRegistration';
import {Entity, Column, ManyToOne, JoinTable, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { User } from './User';
import {File} from "./File";

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    nickname: string;

    @Column({ default: false })
    isPrimary: boolean;

    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    @OneToOne(() => File, (file) => file.userProfile)
    @JoinColumn()
    avatar: File

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.userProfile)
    @JoinTable()
    eventRegistrations: EventRegistration[]
}
