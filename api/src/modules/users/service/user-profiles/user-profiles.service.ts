import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import {
    Repository,
} from 'typeorm';
import {BaseService} from "../../../../base/BaseService";
@Injectable()
export class UserProfilesService extends BaseService<UserProfile>{
    constructor(@InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>) {
        super(userProfileRepository, {
            user: {
                profiles: { avatar: true },
            },
            avatar: true
        })
    }
}
