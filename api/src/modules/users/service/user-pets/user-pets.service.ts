import { UserPet } from 'src/typeorm/entities/UserPet';
import { CreateUserPetDto, UpdateUserPetDto } from '../../dtos/UserPet.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {BaseService} from "../../../../base/BaseService";
import {File} from "../../../../typeorm/entities/File";

@Injectable()
export class UserPetsService extends BaseService<UserPet> {
    constructor(
        @InjectRepository(UserPet) private petRepository: Repository<UserPet>,
        @InjectRepository(File) private fileRepository: Repository<File>
    ) {
        super(petRepository)
    }

    async create(createPetDto: CreateUserPetDto): Promise<UserPet> {
        const petPayload = createPetDto
        delete petPayload.images

        const newPet: UserPet = this.petRepository.create({
                ...createPetDto,
                // images: createPetDto.images?.length ? createPetDto.images : null,
                user: <any> createPetDto.user ?? null,
            })

        const createdPet: UserPet = await this.petRepository.save(newPet);

        if (createPetDto.images?.length) {
            const filePromises = createPetDto.images.map(async (fileId) => {
                const file = await this.fileRepository.findOne(fileId);
                if (file) {
                    file.pet = createdPet;
                    return await this.fileRepository.save(file);
                }
            });

            const createdFiles = await Promise.all(filePromises);

            createdPet.images = createdFiles.filter((file) => file);
        }

        return createdPet
    }
}
