import { UserPet } from 'src/typeorm/entities/UserPet';
import { CreatePetDto, UpdatePetDto } from '../../dtos/Pet.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {BaseService} from "../../../../base/BaseService";
import {File} from "../../../../typeorm/entities/File";

@Injectable()
export class PetService extends BaseService<UserPet> {
    constructor(@InjectRepository(UserPet) private petRepository: Repository<UserPet>) {
        super(petRepository)
    }

    async create(createPetDto: CreatePetDto): Promise<UserPet> {
        console.log(createPetDto)
        const newPet: UserPet = this.petRepository.create({
                ...createPetDto,
                // images: createPetDto.images?.length ? createPetDto.images : null,
                user: <any> createPetDto.user ?? null,
            })

        if (createPetDto.images?.length) {
            newPet.images.push(...createPetDto.images.map(id => ({ id } as File)))
        }

        return await this.petRepository.save(newPet);
    }
}
