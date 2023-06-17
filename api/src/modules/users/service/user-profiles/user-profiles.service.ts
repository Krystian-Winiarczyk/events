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
    async create(profileData: CreateUserProfileDto | CreateUserProfileDto[]): Promise<UserProfile> {
        let data = null;

        if (Array.isArray(profileData)) {
            data = profileData.map(profile => {
                return this.userProfileRepository.create({
                    ...profile,
                    avatar: <any> profile.avatar ?? null,
                    user: <any> profile.user ?? null,
                })
            })
        } else {
            console.log(profileData)
            data = this.userProfileRepository.create({
                ...profileData,
                avatar: <any> profileData.avatar ?? null,
                user: <any> profileData.user ?? null,
            })
        }

        return await this.userProfileRepository.save(data);
    }
}
