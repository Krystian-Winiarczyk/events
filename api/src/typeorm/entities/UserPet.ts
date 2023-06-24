import { Entity, Column, ManyToOne, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { Gender } from "../../constants/Gender";
import { User } from './User';
import { File } from "./File";

@Entity({ name: 'user_pets' })
export class UserPet extends BaseEntity {
    /**
     * @Description Name of the dog
     * @Required true
     * @Type string
     */
    @Column()
    name: string

    /**
     * @Description Number of dog passport
     * @Required true
     * @Type string
     */
    @Column()
    passportNumber: string

    /**
     * @Description Dog breed
     * @Required false
     * @Type string
     */
    @Column({ nullable: true })
    breed: string

    /**
     * @Description Dog weight
     * @Required false
     * @Type number
     */
    @Column({ nullable: true })
    weight: number

    /**
     * @Description Color of the dog
     * @Required false
     * @Type string
     */
    @Column({ nullable: true })
    color: string

    /**
     * @Description Dog breeding
     * @Required false
     * @Type string
     */
    @Column({ nullable: true })
    breeding: string

    /**
     * @Description Dog personality
     * @Required false
     * @Type string
     */
    @Column({ nullable: true })
    personality: string

    /**
     * @Description Dog gender
     * @Required false
     * @Type Gender
     */
    @Column('enum', { default: Gender.MALE, enum: Gender })
    gender: Gender;

    /**
     * @Description Dog description
     * @Required false
     * @Type text
     */
    @Column({ nullable: true, type: 'text' })
    description: string

    /**
     * @Description Date of do birthday
     * @Required false
     * @Type datetime
     */
    @Column({ nullable: true, type: 'datetime' })
    birthDate: Date;

    /**
     * @Description Dog owner
     * @Required true
     * @Type User
     */
    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    /**
     * @Description Dog images
     * @Required false
     * @Type File[]
     */
    @OneToMany(() => File, file => file.pet)
    @JoinColumn()
    images: File[]

    // @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.pet)
    // @JoinTable()
    // eventRegistrations: EventRegistration[]
}
