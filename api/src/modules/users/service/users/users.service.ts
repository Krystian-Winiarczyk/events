import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { CreateUserDto } from '../../dtos/User.dto';
import {BaseService} from "../../../../base/BaseService";
import {UserProfilesService} from "../user-profiles/user-profiles.service";
import {UserPetsService} from "../user-pets/user-pets.service";

@Injectable()
export class UsersService extends BaseService<User>{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private userProfileService: UserProfilesService,
        private userPetsService: UserPetsService,
    ) {
        super(userRepository)
    }

    async create(createDto: CreateUserDto): Promise<User> {
        const { ...userDetails } = createDto
        const newUser = this.userRepository.create({
            ...userDetails,
            profiles: [],
            pets: [],
        });

        newUser.password = await argon2.hash(userDetails.password);

        if (userDetails.profile) {
            newUser.profiles.push(await this.userProfileService.create({ ...userDetails.profile, isPrimary: true, user: newUser.id }))
        }

        if (userDetails.pet) {
            newUser.pets.push(await this.userPetsService.create({ ...userDetails.pet, user: newUser.id }))
        }

        return await this.userRepository.save(newUser);
    }
}
