import { UsersService } from './../../../users/service/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);

        const saltedPassword = password

        if (user && user.password === saltedPassword) {
            const { password, ...result } = user
            return result
        }

        return null
    }
}
