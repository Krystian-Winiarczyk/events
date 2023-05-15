import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import {
    Repository,
} from 'typeorm';
import { CreateUserProfileDto } from '../../dtos/UserProfile.dto';
import {BaseService} from "../../../../base/BaseService";
@Injectable()
export class UserProfilesService extends BaseService<UserProfile>{
    constructor(@InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>) {
        super(userProfileRepository)
    }

    async create(profileData: CreateUserProfileDto): Promise<UserProfile> {
        const newUserProfile = this.userProfileRepository.create({
            ...profileData,
            user: <any> profileData.user ?? null,
        })

        return await this.userProfileRepository.save(newUserProfile);
    }
}
