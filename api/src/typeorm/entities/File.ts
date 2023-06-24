import {Entity, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import {UserPet} from "./UserPet";
import {UserProfile} from "./UserProfile";

@Entity({ name: 'files' })
export class File extends BaseEntity {
    /**
     * @Description Orginal file name
     * @Required true
     * @Type string
     */
    @Column()
    orginalName: string;

    /**
     * @Description Path to file
     * @Required true
     * @Type string
     */
    @Column()
    path: string;

    /**
     * @Description Filename
     * @Required true
     * @Type string
     */
    @Column()
    filename: string;

    /**
     * @Description File mimetype
     * @Required true
     * @Type string
     */
    @Column()
    mimetype: string;

    /**
     * @Description Assigned file user profile
     * @Required false
     * @Type UserProfile
     */
    @OneToOne(() => UserProfile, (userProfile) => userProfile.avatar, { nullable: true })
    @JoinColumn()
    userProfile: UserProfile

    /**
     * @Description Assigned file user pet
     * @Required false
     * @Type UserPet
     */
    @ManyToOne(() => UserPet, (userPet) => userPet.images, { nullable: true })
    pet: UserPet
}
