import {Entity, Column, OneToMany, JoinTable, Unique, AfterLoad, AfterInsert, AfterUpdate} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { UserPet } from './UserPet';
import { UserProfile } from './UserProfile';
import {Exclude} from "class-transformer";
import {Role} from "../../constants/Role";
import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

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
    @OneToMany(() => UserPet, (pet) => pet.user, { onDelete: 'CASCADE' })
    @JoinTable()
    pets: UserPet[]

    /**
     *  User profiles
     * @returns {UserProfile[]} profiles
     */
    @OneToMany(() => UserProfile, (profile) => profile.user, { onDelete: 'CASCADE' })
    @JoinTable()
    profiles: UserProfile[]

    /**
     *  Refresh authorization token
     * @returns {string} refreshToken
     */
    @Column({ nullable: true })
    @Exclude()
    public refreshToken?: string;

    /**
     *  User profile with {isPrimary} set to true
     * @returns {UserProfile} primaryProfile
     */
    @IsOptional()
    public primaryProfile?: UserProfile

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    getPrimaryProfile?(): void {
        this.primaryProfile = this.profiles.find((profile: UserProfile) => profile.isPrimary);
    }


}
