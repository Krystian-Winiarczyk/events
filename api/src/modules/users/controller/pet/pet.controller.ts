import { BaseController } from '../../../../base/BaseController';
import { PetService } from './../../service/pet/pet.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import {CreatePetDto, UpdatePetDto} from '../../dtos/Pet.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { Request, Response } from 'express';
import {UserProfile} from "../../../../typeorm/entities/UserProfile";
import {UserPet} from "../../../../typeorm/entities/UserPet";
import {Roles} from "../../../../decorators/roles.decorator";
import {Role} from "../../../../constants/Role";
import {CreateUserProfileDto, UpdateUserProfileDto} from "../../dtos/UserProfile.dto";
import {UpdateResult} from "typeorm";

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetController extends BaseController {

    constructor(private petService: PetService) {
        super()
    }

    @Get()
    async getAll(
        @Req() req: Request,
        @Res() res: Response,
        @Query('limit') limit = 25,
        @Query('page') page = 1,
        @Query('q') q,
    ) {
        try {
            const pets: UserPet[] = await this.petService.findAll({
                pagination: this.paginationFragment(limit, page),
                relations: ['user'],
                where: this.resolveFilters(q),
            });

            this.apiSuccessResponse(res, req, pets);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    //
    @Get(':id')
    async getOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const pet: UserPet = await this.petService.findOneById(id, {
                relations: ['user']
            });

            this.apiSuccessResponse(res, req, pet);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post()
    @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createDto: CreatePetDto,
    ) {
        try {
            const pet: UserPet = await this.petService.create(createDto);

            this.apiSuccessResponse(res, req, pet);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Patch(':id')
    @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async updateOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdatePetDto,
    ) {
        try {
            const updateResult: UpdateResult = await this.petService.updateOneById(
                id,
                updateDto,
            );

            this.apiSuccessResponse(res, req, updateResult);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Delete(':id')
    @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async deleteOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const deleteResult: UpdateResult =
                await this.petService.deleteSoftOneById(id);

            this.apiSuccessResponse(res, req, deleteResult);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }
}
