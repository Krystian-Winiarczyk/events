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

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email },
            select: ['email', 'password', 'id'],
        })
    }

   async findUser(id: number) {
        return await this.userRepository.findOne({
            where: { id },
            relations: {
                pets: true,
                profiles: true,
            }
        })
    }

    async findUsers() {
        return await this.userRepository.find({
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
        return await this.userRepository.save(newUser)
    }

    async updateUser(id: number, updateUserDetails: UpdateUserDto) {
        return await this.userRepository.update({ id }, { ...updateUserDetails })
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete({ id })
    }
}
