import { CreateUserParams } from './../../../../utils/types';
import { UsersService } from './../../../users/service/users/users.service';
import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {User} from "../../../../typeorm/entities/User";
import {LoginUserDto} from "../../dtos/LoginUser.dto";
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import {SignupDto} from "../../dtos/Signup.dto";
import {create} from "domain";
import {PetService} from "../../../users/service/pet/pet.service";
import {UserProfilesService} from "../../../users/service/user-profiles/user-profiles.service";
import {Roles} from "../../../../decorators/roles.decorator";
import {Ranks} from "../../../../constants/Ranks";
import {CreateUserProfileDto} from "../../../users/dtos/UserProfile.dto";
import {CreatePetDto} from "../../../users/dtos/Pet.dto";
import {Pet} from "../../../../typeorm/entities/Pet";
import {UserProfile} from "../../../../typeorm/entities/UserProfile";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private userProfilesService: UserProfilesService,
        private petService: PetService,
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
        const user: User = await this.usersService.findOneBy({
            where: { email: userData.email },
            relations: ['pets', 'profiles'],
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

        // Check if user exists
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
            username: signupDto.username,
            password: signupDto.password,
            role: Ranks.USER,
        });

        const profile: UserProfile = await this.userProfilesService.create({ ...signupDto.profile, isPrimary: true, user: newUser.id })
        const pet: Pet = await this.petService.create({ ...signupDto.pet, user: newUser.id })

        delete newUser.password;
        const tokens = await this.getTokens({ ...newUser });
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return {
            ...newUser,
            profiles: [profile],
            pets: [pet],
            ...tokens
        };
    }

    async logout(userId: number) {
        return this.usersService.updateOneById(userId, { refreshToken: null });
    }
}
