import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from './User';

@Entity({ name: 'pets' })
export class Pet extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User
}
