import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from '../../dtos/UserProfile.dto';
import { UpdateUserProfileDto } from '../../dtos/UpdateUserProfile.dto';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
    ) { }

    async findUserProfiles(userId: number) {
        return await this.userProfileRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
        })
    }

    async createUserProfile(userId: number, profileData: CreateUserProfileDto) {
        const newUserProfile = this.userProfileRepository.create({
            ...profileData,
            user: <any>userId,
        })

        return await this.userProfileRepository.save(newUserProfile)
    }

    async updateUserProfile(id: number, profileData: UpdateUserProfileDto) {
        return await this.userProfileRepository.update({ id }, { ...profileData })
    }

    async deleteUserProfile(id: number) {
        return await this.userProfileRepository.delete({ id })
    }
}
