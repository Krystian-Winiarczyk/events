import {Entity, Column, OneToMany, JoinTable, Unique} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { UserPet } from './UserPet';
import { UserProfile } from './UserProfile';
import {Exclude} from "class-transformer";
import {Role} from "../../constants/Role";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    /**
     *  User account email address
     * @returns{string} email
     */
    @Column({ unique: true, nullable: false })
    email: string;

    /**
     *  User password
     * @returns {string} password
     */
    @Column({ nullable: false, select: false })
    password: string;

    /**
     *  Rank of user
     * @returns {Rank} role
     */
    @Column('enum', { default: Role.USER, enum: Role })
    role: Role;

    /**
     *  List of all assigned pets
     * @returns {Pet[]} pets
     */
    @OneToMany(() => UserPet, (pet) => pet.user)
    @JoinTable()
    pets: UserPet[]

    /**
     *  User profiles
     * @returns {UserProfile[]} profiles
     */
    @OneToMany(() => UserProfile, (profile) => profile.user)
    @JoinTable()
    profiles: UserProfile[]

    /**
     *  Refresh authorization token
     * @returns {string} refreshToken
     */
    @Column({ nullable: true })
    @Exclude()
    public refreshToken?: string;
}
