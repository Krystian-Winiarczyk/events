import { CreateUserDto, UpdateUserDto } from '../../dtos/User.dto';
import {
    Body,
    Controller,
    Get,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import {
    Delete,
    Param,
    Patch,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { BaseController } from 'src/base/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { ControllerInterface } from '../../../../interfaces/Controller.interface';
import { User } from '../../../../typeorm/entities/User';
import { UpdateResult } from 'typeorm';
import { RoleGuard } from '../../../../guard/role/role.guard';
import { Role } from '../../../../constants/Role';
import { Roles } from '../../../../decorators/roles.decorator';
import {UserProfilesService} from "../../service/user-profiles/user-profiles.service";
import {UserPetsService} from "../../service/user-pets/user-pets.service";
import {UsersService} from "../../service/users/users.service";
import {CreateUserProfileDto} from "../../dtos/UserProfile.dto";
import { CreateUserPetDto } from "../../dtos/UserPet.dto";
import {UserPet} from "../../../../typeorm/entities/UserPet";
import {UserProfile} from "../../../../typeorm/entities/UserProfile";

// @UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/users')
export class UsersController
    extends BaseController
    implements ControllerInterface
{
    constructor(
        private userService: UsersService,
        private userProfileService: UserProfilesService,
        private petService: UserPetsService,
    ) {
        super();
    }
    @Get()
    // @Roles(Ranks.WORKER, Ranks.ADMIN, Ranks.SUPER_ADMIN, Ranks.USER)
    async getAll(
        @Req() req: Request,
        @Res() res: Response,
        @Query('limit') limit = 25,
        @Query('page') page = 1,
        @Query('q') q,
    ) {
        try {
            const users: User[] = await this.userService.findAll({
                pagination: this.paginationFragment(limit, page),
                relations: ['profiles', 'pets'],
                where: this.resolveFilters(q),
            });

            this.apiSuccessResponse(res, req, users);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Get(':id')
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async getOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const user: User = await this.userService.findOneById(id, {
                relations: ['profiles', 'pets']
            });

            this.apiSuccessResponse(res, req, user);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post()
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createDto: CreateUserDto,
    ) {
        const { confirmPassword, ...userDetails } = createDto;

        if (confirmPassword !== userDetails.password)
            this.apiErrorResponse(res, req, null);

        try {
            const users: User = await this.userService.create(createDto);

            this.apiSuccessResponse(res, req, users);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Patch(':id')
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async updateOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateUserDto,
    ) {
        try {
            const updateResult: UpdateResult = await this.userService.updateOneById(
                id,
                updateDto,
            );

            this.apiSuccessResponse(res, req, updateResult);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Delete(':id')
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async deleteOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const deleteResult: UpdateResult =
                await this.userService.deleteSoftOneById(id);

            this.apiSuccessResponse(res, req, deleteResult);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }


    // User profiles
    @Get(':id/profiles')
    async getUserProfiles(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data: UserProfile[] = await this.userProfileService.findAll({ where: {
                user: { id }
            }});

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
            const data: UserProfile = await this.userProfileService.create({ ...createUserProfileDto, user: id })

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
            const data: UserPet[] = await this.petService.findAll({ where: {
                user: { id }
            }});

            this.apiSuccessResponse(res, req, data)
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

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }
}
