import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { User } from './User';

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    nickname: string;

    @Column()
    isPrimary: boolean;

    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User
}
