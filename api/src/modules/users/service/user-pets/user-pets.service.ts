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
        super(petRepository, {
            user: {
                profiles: { avatar: true },
            },
            avatar: true,
            images: true
        })
    }

}
