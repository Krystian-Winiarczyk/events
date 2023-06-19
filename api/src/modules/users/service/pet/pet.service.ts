import { Pet } from 'src/typeorm/entities/Pet';
import { CreatePetDto, UpdatePetDto } from '../../dtos/Pet.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {BaseService} from "../../../../base/BaseService";
import {File} from "../../../../typeorm/entities/File";

@Injectable()
export class PetService extends BaseService<Pet> {
    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) {
        super(petRepository)
    }

    async create(createPetDto: CreatePetDto): Promise<Pet> {
        console.log(createPetDto)
        const newPet: Pet = this.petRepository.create({
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
