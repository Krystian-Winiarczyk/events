import {Entity, Column, ManyToOne, JoinTable, OneToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from '../../base/BaseEntity';
import { ImageType } from "../../constants/ImageType";
import {Pet} from "./Pet";
import {UserProfile} from "./UserProfile";

@Entity({ name: 'files' })
export class File extends BaseEntity {
    @Column()
    orginalName: string;

    @Column()
    path: string;

    @Column()
    filename: string;

    @Column()
    mimetype: string;

    @Column('enum', { default: ImageType.ANY, enum: ImageType })
    imageType: ImageType;

    @OneToOne(() => UserProfile, (userProfile) => userProfile.avatar, { nullable: true })
    @JoinColumn()
    userProfile: UserProfile

    @ManyToOne(() => Pet, (pet) => pet.images, { nullable: true })
    @JoinTable()
    pet: Pet
}
