import { CreateUserParams } from './../../../../utils/types';
import { UsersService } from './../../../users/service/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);

        const saltedPassword = password

        if (user && user.password === saltedPassword) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(user: any) {
        const fullUser = await this.usersService.findUser(user.id)
        const payload = { ...user }
        return {
            accessToken: this.jwtService.sign(payload),
            ...fullUser,
        }
    }

    async signup(userDetails: CreateUserParams) {
        const data = await this.usersService.createUser(userDetails)
        return {
            accessToken: this.jwtService.sign(data),
            ...data,
        }
    }
}
