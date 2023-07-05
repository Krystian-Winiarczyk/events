import {Entity, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {UserPet} from "./UserPet";
import {UserProfile} from "./UserProfile";
import {FileType} from "../../constants/FileType";

@Entity({ name: 'files' })
export class File extends BaseEntity {
    /**
     *  Orginal file name
     * @returns {string} orginalName
     */
    @Column()
    orginalName: string;

    /**
     *  Path to file
     * @returns {string} path
     */
    @Column()
    path: string;

    /**
     *  Filename
     * @returns {string} filename
     */
    @Column()
    filename: string;

    /**
     *  File mimetype
     * @returns {string} mimetype
     */
    @Column()
    mimetype: string;

    /**
     *  File type
     * @returns {FileType} mimetype
     */
    @Column()
    type: FileType;

    /**
     *  Assigned file my profile
     * @returns {UserProfile} userProfile
     */
    @OneToOne(() => UserProfile, (userProfile) => userProfile.avatar, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    userProfile: UserProfile

    /**
     *  Assigned file my my-my-pets
     * @returns {UserPet} pet
     */
    @ManyToOne(() => UserPet, (userPet) => userPet.images, { nullable: true, onDelete: 'CASCADE' })
    pet: UserPet
}
