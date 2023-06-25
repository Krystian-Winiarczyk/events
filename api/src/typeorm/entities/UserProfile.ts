import {Entity, Column, ManyToOne, JoinTable, OneToOne} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { User } from './User';
import {File} from "./File";
import {Gender} from "../../constants/Gender";

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
    /**
     *  First name of player
     * @returns {string} firstName
     */
    @Column({ nullable: true })
    firstName: string;

    /**
     *  Last name of player
     * @returns {string} lastName
     */
    @Column({ nullable: true })
    lastName: string;

    /**
     *  Nickname of the player
     * @returns {string} nickname
     */
    @Column()
    nickname: string;

    /**
     *  Player gender
     * @returns {Gender} gender
     */
    @Column('enum', { default: Gender.MALE, enum: Gender })
    gender: Gender;

    /**
     *  Player description
     * @returns {text} description
     */
    @Column({ nullable: true, type: 'text' })
    description: string

    /**
     *  Player birthday
     * @returns {datetime} birthDate
     */
    @Column({ nullable: true, type: 'datetime' })
    birthDate: Date;

    /**
     *  Main user profile
     * @returns {boolean} isPrimary
     */
    @Column({ default: false })
    isPrimary: boolean;

    /**
     *  User profile owner
     * @returns {User} user
     */
    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    /**
     *  User profile avatar
     * @returns {File} avatar
     */
    @OneToOne(() => File, (file) => file.userProfile)
    avatar: File

    // @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.userProfile)
    // @JoinTable()
    // eventRegistrations: EventRegistration[]
}
