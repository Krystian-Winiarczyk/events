import {
    Entity,
    Column,
    ManyToOne,
    JoinTable,
    OneToOne,
    AfterLoad,
    AfterInsert,
    AfterUpdate,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { User } from './User';
import {File} from "./File";
import {Gender} from "../../constants/Gender";
import {IsOptional} from "class-validator";
import {UserEventCompetition} from "./UserEventCompetition";
import {EventCompetitionExcelFieldDraft} from "./EventCompetitionExcelFieldDraft";

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
    /**
     *  First name of player
     * @returns {string} firstName
     */
    @Column({ nullable: true })
    firstName: string;

    /**
     *  Last name of player
     * @returns {string} lastName
     */
    @Column({ nullable: true })
    lastName: string;

    /**
     *  Nickname of the player
     * @returns {string} nickname
     */
    @Column()
    nickname: string;

    /**
     *  Player gender
     * @returns {Gender} gender
     */
    @Column('enum', { default: Gender.MALE, enum: Gender })
    gender: Gender;

    /**
     *  Player description
     * @returns {text} description
     */
    @Column({ nullable: true, type: 'text' })
    description: string

    /**
     *  Player birthday
     * @returns {datetime} birthDate
     */
    @Column({ nullable: true, type: 'datetime' })
    birthDate: Date;

    /**
     *  Main my profile
     * @returns {boolean} isPrimary
     */
    @Column({ default: false })
    isPrimary: boolean;

    /**
     *  Social media url
     * @returns {string} websiteUrl
     */
    @Column({ nullable: true })
    websiteUrl: string

    /**
     *  Social media url
     * @returns {string} youtubeUrl
     */
    @Column({ nullable: true })
    youtubeUrl: string

    /**
     *  Social media url
     * @returns {string} facebookUrl
     */
    @Column({ nullable: true })
    facebookUrl: string

    /**
     *  Social media url
     * @returns {string} instagramUrl
     */
    @Column({ nullable: true })
    instagramUrl: string

    /**
     *  Social media url
     * @returns {string} tiktokUrl
     */
    @Column({ nullable: true })
    tiktokUrl: string

    /**
     *  Social media url
     * @returns {string} twitter
     */
    @Column({ nullable: true })
    twitterUrl: string

    /**
     *  User profile owner
     * @returns {User} my
     */
    @ManyToOne(() => User, (user) => user.pets, { onDelete: 'CASCADE' })
    @JoinTable()
    user: User

    /**
     *  User profile avatar
     * @returns {File} avatar
     */
    @OneToOne(() => File, (file) => file.userProfile, { onDelete: 'CASCADE' })
    @JoinColumn()
    avatar: File

    /**
     *  User event competitions
     * @returns {UserEventCompetition[]} profiles
     */
    @OneToMany(() => UserEventCompetition, (userEventCompetition) => userEventCompetition.userProfile, { onDelete: 'CASCADE' })
    @JoinTable()
    userEventCompetitions: UserEventCompetition[]

    /**
     *  List of all assigned event competition excel field draft
     * @returns {EventCompetitionExcelFieldDraft[]} pets
     */
    @OneToMany(() => EventCompetitionExcelFieldDraft, (eventCompetitionExcelFieldDraft) => eventCompetitionExcelFieldDraft.userProfile, { onDelete: 'CASCADE' })
    @JoinTable()
    eventCompetitionExcelFieldDrafts: EventCompetitionExcelFieldDraft[]

    /**
     *  User profile full name
     * @returns {string} primaryProfile
     */
    @IsOptional()
    public name?: string

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    getFullName?(): void {
        this.name = this.firstName + ' ' + this.lastName
    }

    // @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.userProfile)
    // @JoinTable()
    // eventRegistrations: EventRegistration[]
}
