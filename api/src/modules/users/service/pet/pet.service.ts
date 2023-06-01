import { Pet } from 'src/typeorm/entities/Pet';
import { CreatePetDto, UpdatePetDto } from '../../dtos/Pet.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {BaseService} from "../../../../base/BaseService";

@Injectable()
export class PetService extends BaseService<Pet> {
    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) {
        super(petRepository)
    }

    async create(createPetDto: CreatePetDto): Promise<Pet> {
        const newPet = this.petRepository.create({
            ...createPetDto,
            user: <any> createPetDto.user ?? null,
        })

        return await this.petRepository.save(newPet);
    }
}
