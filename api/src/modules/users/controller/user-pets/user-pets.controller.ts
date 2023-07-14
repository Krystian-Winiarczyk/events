import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UpdateResult } from "typeorm";

import { BaseController } from '../../../../base/BaseController';

import { UserPet } from "../../../../typeorm/entities/UserPet";

import { CreateUserPetDto, UpdateUserPetDto } from '../../dtos/UserPet.dto';

import { UserPetsService } from '../../service/user-pets/user-pets.service';

@Controller('api/my/pets')
// @UseGuards(JwtAuthGuard)
export class UserPetsController extends BaseController {
    constructor(private petService: UserPetsService) {
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
                relations: {
                    user: true,
                    avatar: true,
                    images: true
                },
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
                relations: {
                    user: true,
                    avatar: true,
                    images: true
                }
            });

            this.apiSuccessResponse(res, req, pet);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post()
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createDto: CreateUserPetDto,
    ) {
        try {
            const pet: UserPet = await this.petService.create(createDto);

            this.apiSuccessResponse(res, req, pet);
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
        @Body() updateDto: UpdateUserPetDto,
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
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
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
