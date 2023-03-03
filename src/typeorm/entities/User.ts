import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Pet } from './Pet';
import { UserProfile } from './UserProfile';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    password: string;

    @Column({ default: 'USER' })
    role: string;

    @OneToMany(() => Pet, (pet) => pet.user)
    @JoinTable()
    pets: Pet[]

    @OneToMany(() => UserProfile, (profile) => profile.user)
    @JoinTable()
    profiles: UserProfile[]
}
