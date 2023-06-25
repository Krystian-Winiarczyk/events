import { Entity, Column, ManyToOne, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { Gender } from "../../constants/Gender";
import { User } from './User';
import { File } from "./File";

@Entity({ name: 'user_pets' })
export class UserPet extends BaseEntity {
    /**
     *  Name of the dog
     * @returns {string} name
     */
    @Column()
    name: string

    /**
     *  Number of dog passport
     * @returns {string} passportNumber
     */
    @Column()
    passportNumber: string

    /**
     *  Dog breed
     * @returns {string} breed
     */
    @Column({ nullable: true })
    breed: string

    /**
     *  Dog weight
     * @returns {number} weight
     */
    @Column({ nullable: true })
    weight: number

    /**
     *  Color of the dog
     * @returns {string} color
     */
    @Column({ nullable: true })
    color: string

    /**
     *  Dog breeding
     * @returns {string} breeding
     */
    @Column({ nullable: true })
    breeding: string

    /**
     *  Dog personality
     * @returns {string} personality
     */
    @Column({ nullable: true })
    personality: string

    /**
     *  Dog gender
     * @returns {Gender} gender
     */
    @Column('enum', { default: Gender.MALE, enum: Gender })
    gender: Gender;

    /**
     *  Dog description
     * @returns {text} description
     */
    @Column({ nullable: true, type: 'text' })
    description: string

    /**
     *  Date of do birthday
     * @returns {datetime} birthDate
     */
    @Column({ nullable: true, type: 'datetime' })
    birthDate: Date;

    /**
     *  Dog owner
     * @returns {User} user
     */
    @ManyToOne(() => User, (user) => user.pets)
    @JoinTable()
    user: User

    /**
     *  Dog images
     * @returns {File[]} images
     */
    @OneToMany(() => File, file => file.pet)
    @JoinColumn()
    images: File[]

    // @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.user-user-pets)
    // @JoinTable()
    // eventRegistrations: EventRegistration[]
}
