import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { UserPet } from './UserPet';
import { UserProfile } from './UserProfile';
import {Exclude} from "class-transformer";
import {Role} from "../../constants/Role";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    /**
     * @Description User account email address
     * @Required true
     * @Unique true
     * @Type string
     */
    @Column({ unique: true, nullable: false })
    email: string;

    /**
     * @Description User password
     * @Required true
     * @Type string
     */
    @Column({ nullable: false, select: false })
    password: string;

    /**
     * @Description Rank of user
     * @Required true
     * @Type Rank
     */
    @Column('enum', { default: Role.USER, enum: Role })
    role: Role;

    /**
     * @Description List of all assigned pets
     * @Required true
     * @Type Pet[]
     */
    @OneToMany(() => UserPet, (pet) => pet.user)
    @JoinTable()
    pets: UserPet[]

    /**
     * @Description User profiles
     * @Required true
     * @Type UserProfile[]
     */
    @OneToMany(() => UserProfile, (profile) => profile.user)
    @JoinTable()
    profiles: UserProfile[]

    /**
     * @Description Refresh authorization token
     * @Required false
     * @Type string
     */
    @Column({ nullable: true })
    @Exclude()
    public refreshToken?: string;
}
