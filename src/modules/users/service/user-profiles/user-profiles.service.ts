import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { UpdateUserProfileDto } from '../../dtos/UpdateUserProfile.dto';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
    ) { }

    findUserProfiles(userId: number) {
        return this.userProfileRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
        })
    }

    createUserProfile(userId: number, profileData: CreateUserProfileDto) {
        const newUserProfile = this.userProfileRepository.create({
            ...profileData,
            user: <any>userId,
        })

        return this.userProfileRepository.save(newUserProfile)
    }

    updateUserProfile(id: number, profileData: UpdateUserProfileDto) {
        return this.userProfileRepository.update({ id }, { ...profileData })
    }

    deleteUserProfile(id: number) {
        return this.userProfileRepository.delete({ id })
    }
}
