import { Pet } from 'src/typeorm/entities/Pet';
import { UpdatePetDto } from './../../dtos/UpdatePetDto';
import { CreatePetDto } from './../../dtos/CreatePetDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet) private petRepository: Repository<Pet>,
    ) { }

    findUserPets(userId: number) {
        return this.petRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
        })
    }

    createUserPet(userId: number, petData: CreatePetDto) {
        const newPet = this.petRepository.create({
            ...petData,
            user: <any> userId,
        })

        return this.petRepository.save(newPet)
    }

    updatePet(id: number, petData: UpdatePetDto) {
        return this.petRepository.update({ id }, { ...petData })
    }

    deletePet(id: number) {
        return this.petRepository.delete({ id })
    }
}
