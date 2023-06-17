import { Size } from './../../constants/Size';
import { Entity, Column, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { User } from './User';
import { EventRegistration } from './EventRegistration';
import {File} from "./File";

@Entity({ name: 'pets' })
export class Pet extends BaseEntity {
    @Column()
    name: string

    @Column({ nullable: true })
    breed: string

    @Column({ nullable: true })
    age: number

    @Column('enum', { default: Size.MEDIUM, enum: Size })
    size: Size

    @Column({ nullable: true })
    color: string

    @Column({ nullable: true })
    personality: string

    @Column({ nullable: true })
    test: string

    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    @OneToMany(() => File, file => file.pet)
    @JoinTable()
    images: File[]

    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.pet)
    @JoinTable()
    eventRegistrations: EventRegistration[]
}
