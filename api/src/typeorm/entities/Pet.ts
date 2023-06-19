import { Size } from './../../constants/Size';
import {Entity, Column, ManyToOne, JoinTable, OneToMany, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { User } from './User';
import { EventRegistration } from './EventRegistration';
import {File} from "./File";
import {Gender} from "../../constants/Gender";

@Entity({ name: 'pets' })
export class Pet extends BaseEntity {
    @Column()
    name: string

    @Column({ nullable: true })
    breed: string

    @Column({ nullable: true })
    color: string

    @Column({ nullable: true })
    personality: string

    @Column('enum', { default: Gender.MALE, enum: Gender })
    gender: Gender;

    @Column({ nullable: true, type: 'text' })
    description: string

    @Column({ nullable: true, type: 'datetime' })
    birthDate: Date;

    @Column('enum', { default: Size.MEDIUM, enum: Size })
    size: Size

    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    @OneToMany(() => File, file => file.pet)
    @JoinColumn()
    images: File[]

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.pet)
    @JoinTable()
    eventRegistrations: EventRegistration[]
}
