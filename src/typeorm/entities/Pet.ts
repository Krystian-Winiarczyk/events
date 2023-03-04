import { Size } from './../../constants/Size';
import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from './User';

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

    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User
}
