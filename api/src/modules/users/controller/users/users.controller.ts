import {
    Body,
    Controller,
    Get,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import {
    Param,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { BaseController } from 'src/base/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { User } from '../../../../typeorm/entities/User';
import { RoleGuard } from '../../../../guard/role/role.guard';
import {UserProfilesService} from "../../service/user-profiles/user-profiles.service";
import {UserPetsService} from "../../service/user-pets/user-pets.service";
import {UsersService} from "../../service/users/users.service";
import {CreateUserProfileDto} from "../../dtos/UserProfile.dto";
import { CreateUserPetDto } from "../../dtos/UserPet.dto";
import {UserPet} from "../../../../typeorm/entities/UserPet";
import {UserProfile} from "../../../../typeorm/entities/UserProfile";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/users')
export class UsersController extends BaseController<User>
{
    constructor(
        private userService: UsersService,
        private userProfileService: UserProfilesService,
        private petService: UserPetsService,
    ) {
        super(userService);
    }

    // User profiles
    @Get(':id/profiles')
    async getUserProfiles(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const [data, total]: [ UserProfile[], number ] = await this.userProfileService.findAll({ where: {
                user: { id }
            }});

            this.apiSuccessResponse({ res, req, data, total })
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Post(':id/profiles')
    async createUserProfile(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto
    ) {
        try {
            const data: UserProfile = await this.userProfileService.create({ ...createUserProfileDto, user: id })

            this.apiSuccessResponse({ res, req, data })
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    // Pet profiles
    @Get(':id/pets')
    async getUserPets(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const [data, total]: [ UserPet[], number ] = await this.petService.findAll({ where: {
                user: { id }
            }});

            this.apiSuccessResponse({ res, req, data, total })
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Post(':id/pets')
    async createUserPet(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() createPetDto: CreateUserPetDto
    ) {
        try {
            const data: UserPet = await this.petService.create({ ...createPetDto, user: id })

            this.apiSuccessResponse({ res, req, data })
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }
}
