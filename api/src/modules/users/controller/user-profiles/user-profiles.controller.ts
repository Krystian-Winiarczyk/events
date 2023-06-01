import { BaseController } from '../../../../base/BaseController';
import {Controller, Param, ParseIntPipe, Body, Patch, Delete, Get, Req, Res, Query, Post} from "@nestjs/common";
import {CreateUserProfileDto, UpdateUserProfileDto} from "../../dtos/UserProfile.dto";
import { UserProfilesService } from "../../service/user-profiles/user-profiles.service";
import { Request, Response } from 'express';
import {Roles} from "../../../../decorators/roles.decorator";
import {Ranks} from "../../../../constants/Ranks";
import {UpdateResult} from "typeorm";
import {UserProfile} from "../../../../typeorm/entities/UserProfile";

@Controller('api/user/profiles')
export class UserProfilesController extends BaseController {
    constructor(private userProfileService: UserProfilesService) {
        super();
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
            const userProfiles: UserProfile[] = await this.userProfileService.findAll({
                pagination: this.paginationFragment(limit, page),
                relations: ['user'],
                where: this.resolveFilters(q),
            });

            this.apiSuccessResponse(res, req, userProfiles);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Get(':id')
    async getOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const userProfile: UserProfile = await this.userProfileService.findOneById(id, {
                relations: ['user']
            });

            this.apiSuccessResponse(res, req, userProfile);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post()
    @Roles(Ranks.WORKER, Ranks.ADMIN, Ranks.SUPER_ADMIN, Ranks.USER)
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createDto: CreateUserProfileDto,
    ) {
        try {
            const userProfile: UserProfile = await this.userProfileService.create(createDto);

            this.apiSuccessResponse(res, req, userProfile);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Patch(':id')
    @Roles(Ranks.WORKER, Ranks.ADMIN, Ranks.SUPER_ADMIN, Ranks.USER)
    async updateOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateUserProfileDto,
    ) {
        try {
            const updateResult: UpdateResult = await this.userProfileService.updateOneById(
                id,
                updateDto,
            );

            this.apiSuccessResponse(res, req, updateResult);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Delete(':id')
    @Roles(Ranks.WORKER, Ranks.ADMIN, Ranks.SUPER_ADMIN, Ranks.USER)
    async deleteOneById(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const deleteResult: UpdateResult =
                await this.userProfileService.deleteSoftOneById(id);

            this.apiSuccessResponse(res, req, deleteResult);
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }
}
