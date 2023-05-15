import { CreateUserParams } from './../../../../utils/types';
import { UsersService } from './../../../users/service/users/users.service';
import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {User} from "../../../../typeorm/entities/User";
import {LoginUserDto} from "../../dtos/LoginUser.dto";
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    protected hashData(data: string) {
        return argon2.hash(data);
    }

    protected async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.updateOneById(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    protected async getTokens(userData) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(userData, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: this.configService.get<string>('JWT_EXPIRES'),
            }),
            this.jwtService.signAsync(userData, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user: User = await this.usersService.findOneById(userId, {});
        console.log(user, refreshToken);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');

        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );

        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens({ ...user });
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async signIn(userData: LoginUserDto) {
        // Check if user exists
        const user = await this.usersService.findOneBy({
            where: { email: userData.email },
            relations: [],
            select: [
                'id',
                'email',
                'password',
                'password',
                'refreshToken',
            ],
        });
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(
            user.password,
            userData.password,
        );
        if (!passwordMatches)
            throw new BadRequestException('Password is incorrect');

        delete user.password;
        const tokens = await this.getTokens({ ...user });
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return { ...user, ...tokens };
    }

    async signUp(createUserDto): Promise<any> {
        // Check if user exists
        const userExists = await this.usersService.findOneBy({
            where: {
                email: createUserDto.email,
            }
        });

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });

        delete newUser.password;
        const tokens = await this.getTokens({ ...newUser });
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return { ...newUser, ...tokens };
    }

    async logout(userId: number) {
        return this.usersService.updateOneById(userId, { refreshToken: null });
    }
}
