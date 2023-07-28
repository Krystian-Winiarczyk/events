import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import {
    Repository,
} from 'typeorm';
import { CreateUserProfileDto } from '../../dtos/UserProfile.dto';
import {BaseService} from "../../../../base/BaseService";
import {File} from "../../../../typeorm/entities/File";
@Injectable()
export class UserProfilesService extends BaseService<UserProfile>{
    constructor(@InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>) {
        super(userProfileRepository, { avatar: true })
    }
}
