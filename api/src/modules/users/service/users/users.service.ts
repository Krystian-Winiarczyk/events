import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import {
    DeleteResult,
    FindOptionsSelect,
    FindOptionsSelectByString,
    FindOptionsWhere,
    Repository,
    UpdateResult,
} from 'typeorm';
import { ServiceInterface } from '../../../../interfaces/Service.interface';
import { BaseDto } from 'src/base/BaseDto';
import {
    FindOptionsRelationByString,
    FindOptionsRelations,
} from 'typeorm/find-options/FindOptionsRelations';
import * as argon2 from 'argon2';
import { CreateUserDto } from '../../dtos/User.dto';
import {BaseService} from "../../../../base/BaseService";
import {UserProfilesService} from "../user-profiles/user-profiles.service";

@Injectable()
export class UsersService extends BaseService<User>{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private userProfileService: UserProfilesService,
    ) {
        super(userRepository)
    }

    async create(createDto: CreateUserDto): Promise<User> {
        const { ...userDetails } = createDto
        const newUser = this.userRepository.create({
            ...userDetails,
        });

        newUser.password = await argon2.hash(userDetails.password);

        if (userDetails.profile) {
            newUser.profiles.push(await this.userProfileService.create({ ...userDetails.profile, isPrimary: true }))
        }

        return await this.userRepository.save(newUser);
    }
}
