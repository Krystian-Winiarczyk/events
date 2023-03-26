import { PetService } from './../../service/pet/pet.service';
import { CreatePetDto } from '../../dtos/Pet.dto';
import { UsersService } from '../../service/users/users.service';
import { CreateUserDto, UpdateUserDto } from '../../dtos/User.dto';
import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { Delete, Param, Patch, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { UserProfilesService } from '../../service/user-profiles/user-profiles.service';
import { CreateUserProfileDto } from '../../dtos/UserProfile.dto';
import { Request, Response } from 'express';
import { BaseController } from 'src/modules/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController extends BaseController {
    constructor(
        private userService: UsersService,
        private userProfileService: UserProfilesService,
        private petService: PetService,
    ) {
        super()
    }

    @Get()
    async getUsers(@Req() req: Request, @Res() res: Response) {
        try {
            const data = await this.userService.findUsers();

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Get(':id')
    async getUser(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data = await this.userService.findUser(id);

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    // User profiles
    @Get(':id/profiles')
    async getUserProfiles(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data = await this.userProfileService.findUserProfiles(id);

            this.apiSuccessResponse(res, req, data)
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
            const data = await this.userProfileService.createUserProfile(id, createUserProfileDto)

            this.apiSuccessResponse(res, req, data)
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
            const data = await this.petService.findUserPets(id)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Post(':id/pets')
    async createUserPet(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() createPetDto: CreatePetDto
    ) {
        try {
            const data = await this.petService.createUserPet(id, createPetDto)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Post()
    async createUser(
        @Req() req: Request, @Res() res: Response,
        @Body() createUserDto: CreateUserDto
    ) {
        const { confirmPassword, ...userDetails } = createUserDto
        try {
            const data = await this.userService.createUser(userDetails)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Patch(':id')
    async updateUser(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        try {
            const data = await this.userService.updateUser(id, updateUserDto)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Delete(':id')
    async deleteUser(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data = await this.userService.deleteUser(id)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }
}
