import { Pet } from 'src/typeorm/entities/Pet';
import { CreatePetDto, UpdatePetDto } from '../../dtos/Pet.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "../../../../typeorm/entities/User";
import {UserProfilesService} from "../user-profiles/user-profiles.service";
import {CreateUserDto} from "../../dtos/User.dto";
import * as argon2 from "argon2";
import {BaseService} from "../../../../base/BaseService";

@Injectable()
export class PetService extends BaseService<Pet> {
    constructor(
        @InjectRepository(Pet) private petRepository: Repository<Pet>,
        private userProfileService: UserProfilesService,
    ) {
        super(petRepository)
    }

    async create(createDto: CreatePetDto): Promise<Pet> {
        const newPet = this.petRepository.create({
            ...createDto,
        });

        return await this.petRepository.save(newPet);
    }
}
