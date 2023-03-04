import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Pet } from './Pet';
import { UserProfile } from './UserProfile';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ unique: true, nullable: false })
    phone: string;

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
}
