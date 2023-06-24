import {Entity, Column, ManyToOne, JoinTable, OneToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { User } from './User';
import {File} from "./File";
import {Gender} from "../../constants/Gender";

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
    /**
     * @Description First name of player
     * @Required true
     * @Type string
     */
    @Column({ nullable: true })
    firstName: string;

    /**
     * @Description Last name of player
     * @Required true
     * @Type string
     */
    @Column({ nullable: true })
    lastName: string;

    /**
     * @Description Nickname of the player
     * @Required false
     * @Type string
     */
    @Column()
    nickname: string;

    /**
     * @Description Player gender
     * @Required false
     * @Type Gender
     */
    @Column('enum', { default: Gender.MALE, enum: Gender })
    gender: Gender;

    /**
     * @Description Player description
     * @Required false
     * @Type text
     */
    @Column({ nullable: true, type: 'text' })
    description: string

    /**
     * @Description Player birthday
     * @Required false
     * @Type datetime
     */
    @Column({ nullable: true, type: 'datetime' })
    birthDate: Date;

    /**
     * @Description Main user profile
     * @Required true
     * @Type boolean
     */
    @Column({ default: false })
    isPrimary: boolean;

    /**
     * @Description User profile owner
     * @Required true
     * @Type User
     */
    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    /**
     * @Description User profile avatar
     * @Required false
     * @Type File
     */
    @OneToOne(() => File, (file) => file.userProfile)
    avatar: File

    // @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.userProfile)
    // @JoinTable()
    // eventRegistrations: EventRegistration[]
}
