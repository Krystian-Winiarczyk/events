import { Entity, Column, OneToMany, JoinTable, VirtualColumn } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { Pet } from './Pet';
import { UserProfile } from './UserProfile';
import {Exclude} from "class-transformer";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    // @Column({ unique: true, nullable: false })
    // @Column({ nullable: false })
    // username: string;

    // @Column({ unique: true, nullable: false })
    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ default: 'USER', nullable: false })
    role: string;

    @OneToMany(() => Pet, (pet) => pet.user)
    @JoinTable()
    pets: Pet[]

    @OneToMany(() => UserProfile, (profile) => profile.user)
    @JoinTable()
    profiles: UserProfile[]

    @Column({ nullable: true })
    @Exclude()
    public refreshToken?: string;
    // @VirtualColumn()
    // get mainProfile() {
        // return this.profiles.find(profile => profile.isPrimary)
    // }
}
