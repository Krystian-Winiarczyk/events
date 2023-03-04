import { UserProfile } from './../../../../typeorm/entities/UserProfile';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { CreateUserParams } from '../../../../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
    ) { }

    findUserByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email },
            relations: {
                pets: true,
                profiles: true,
            }
        })
    }

    findUser(id: number) {
        return this.userRepository.findOne({
            where: { id },
            relations: {
                pets: true,
                profiles: true,
            }
        })
    }

    findUsers() {
        return this.userRepository.find({
            relations: {
                pets: true,
                profiles: true,
            }
        })
    }

    async createUser(userDetails: CreateUserParams) {
        const { lastName, firstName, nickname = '', ...userData } = userDetails
        const newUser = this.userRepository.create({
            ...userData,
        })

        const newProfile = this.userProfileRepository.create({
            firstName,
            lastName,
            nickname,
            isPrimary: true,
        })
        await this.userProfileRepository.save(newProfile)

        newUser.profiles = [newProfile]
        return this.userRepository.save(newUser)
    }

    updateUser(id: number, updateUserDetails: UpdateUserDto) {
        return this.userRepository.update({ id }, { ...updateUserDetails })
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id })
    }
}
