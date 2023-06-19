import { EventRegistration } from './EventRegistration';
import {Entity, Column, ManyToOne, JoinTable, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { User } from './User';
import {File} from "./File";
import {Size} from "../../constants/Size";
import {Gender} from "../../constants/Gender";

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    nickname: string;

    @Column('enum', { default: Gender.MALE, enum: Gender })
    gender: Gender;

    @Column({ nullable: true, type: 'text' })
    description: string

    @Column({ nullable: true, type: 'datetime' })
    birthDate: Date;

    @Column({ default: false })
    isPrimary: boolean;

    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    @OneToOne(() => File, (file) => file.userProfile)
    avatar: File

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.userProfile)
    @JoinTable()
    eventRegistrations: EventRegistration[]
}
