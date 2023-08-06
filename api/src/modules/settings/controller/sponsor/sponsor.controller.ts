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
import { UpdateResult } from 'typeorm';
import { RoleGuard } from '../../../../guard/role/role.guard';
import {Sponsor} from "../../../../typeorm/entities/Sponsor";
import {SponsorService} from "../../service/sponsor/sponsor.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/settings/sponsors')
export class SponsorController extends BaseController implements ControllerInterface {
    constructor(private sponsorService: SponsorService) {
        super()
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
            const [competitions, total]: [ Sponsor[], number ] = await this.sponsorService.findAll({
                pagination: this.paginationFragment(limit, page),
                where: this.resolveFilters(q),
            });

            this.apiSuccessResponse({ res, req, data: competitions, total });
        } catch (error) {
            this.apiErrorResponse(res, req, error)
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
            const competition: Sponsor = await this.sponsorService.findOneById(id, {})

            this.apiSuccessResponse({ res, req, data: competition })
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post()
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createDto: any | any[],
    ) {
        try {
            let competition: Sponsor | Sponsor[] = null

            if (Array.isArray(createDto) && createDto.length)
                competition = await Promise.all(createDto.map(async singleDto => await this.sponsorService.create(singleDto)))
            else
                competition = await this.sponsorService.create(createDto)


            this.apiSuccessResponse({ res, req, data: competition });
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
        @Body() updateDto: any,
    ) {
        try {
            const updateResult: UpdateResult = await this.sponsorService.updateOneById(
                id,
                updateDto,
            );

            this.apiSuccessResponse({ res, req, data: updateResult });
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
                await this.sponsorService.deleteSoftOneById(id);

            this.apiSuccessResponse({ res, req, data: deleteResult });
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }
}
