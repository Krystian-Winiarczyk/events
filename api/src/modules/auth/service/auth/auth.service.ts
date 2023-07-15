import { UsersService } from '../../../users/service/users/users.service';
import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {User} from "../../../../typeorm/entities/User";
import {LoginUserDto} from "../../dtos/LoginUser.dto";
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import {SignupDto} from "../../dtos/Signup.dto";
import {UserPetsService} from "../../../users/service/user-pets/user-pets.service";
import {UserProfilesService} from "../../../users/service/user-profiles/user-profiles.service";
import {Role} from "../../../../constants/Role";
import {UserPet} from "../../../../typeorm/entities/UserPet";
import {UserProfile} from "../../../../typeorm/entities/UserProfile";
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private userProfilesService: UserProfilesService,
        private petService: UserPetsService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    protected hashData(data: string) {
        return argon2.hash(data);
    }

    protected async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        return await this.usersService.updateOneById(userId, {
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
        const user: User = await this.usersService.findOneById(userId, { relations: {
                profiles: {
                    avatar: true
                },
                pets: {
                    avatar: true,
                    images: true,
                },
            } });

        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');

        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );

        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens({ ...user });
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        delete user.refreshToken
        const resp = { ...tokens, ...user }
        return resp;
    }

    async signIn(userData: LoginUserDto) {
        // Check if my exists
        const user: User = await this.usersService.findOneBy({
            where: { email: userData.email },
            relations: {
                profiles: {
                    avatar: true
                },
                pets: {
                    avatar: true,
                    images: true,
                },
            },
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

    async signUp(signupDto: SignupDto): Promise<any> {
        const passwordsMatch = signupDto.password === signupDto.confirmPassword

        if (!passwordsMatch) {
            throw new BadRequestException('Passwords are not the same');
        }

        // Check if my exists
        const where: { email: string, username?: string } = {
            email: signupDto.email,
        }
        if (signupDto.username) where.username = signupDto.username

        const userWithEmailExists: User = await this.usersService.findOneBy({
            where,
        });

        if (userWithEmailExists) {
            throw new BadRequestException('User already exists');
        }

        const newUser: User = await this.usersService.create({
            email: signupDto.email,
            password: signupDto.password,
            role: Role.USER,
        });

        await this.userProfilesService.create({ ...signupDto.profile, isPrimary: true, user: newUser.id })

        await this.petService.create({ ...signupDto.pet, user: newUser.id })

        delete newUser.password;

        const tokens = await this.getTokens({ ...newUser });
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return {
            ...(await this.usersService.findOneById(newUser.id, { relations: {
                profiles: { avatar: true },
                pets: { images: true, avatar: true },
            } })),
            ...tokens
        };
    }

    async logout(userId: number) {
        return this.usersService.updateOneById(userId, { refreshToken: null });
    }
}
