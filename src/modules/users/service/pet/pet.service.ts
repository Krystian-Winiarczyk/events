import { Pet } from 'src/typeorm/entities/Pet';
import { CreatePetDto, UpdatePetDto } from '../../dtos/Pet.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet) private petRepository: Repository<Pet>,
    ) { }

    async findPets() {
        return await this.petRepository.find({
            relations: {
                user: true
            }
        })
    }

    async findUserPets(userId: number) {
        return await this.petRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
        })
    }

    async createUserPet(userId: number, petData: CreatePetDto) {
        const newPet = this.petRepository.create({
            ...petData,
            user: <any> userId,
        })

        return await this.petRepository.save(newPet)
    }

    async updatePet(id: number, petData: UpdatePetDto) {
        return await this.petRepository.update({ id }, { ...petData })
    }

    async deletePet(id: number) {
        return await this.petRepository.delete({ id })
    }
}
