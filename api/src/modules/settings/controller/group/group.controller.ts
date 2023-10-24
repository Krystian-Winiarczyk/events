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
import {Group} from "../../../../typeorm/entities/Group";
import {GroupService} from "../../service/group/group.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/settings/groups')
export class GroupController extends BaseController implements ControllerInterface {
    constructor(private groupService: GroupService) {
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
            const [groups, total]: [ Group[], number ] = await this.groupService.findAll({
                pagination: this.paginationFragment(limit, page),
                where: this.resolveFilters(q),
            });

            this.apiSuccessResponse({ res, req, data: groups, total });
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
            const group: Group = await this.groupService.findOneById(id, {})

            this.apiSuccessResponse({ res, req, data: group })
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post()
    // @Roles(Role.WORKER, Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() createDto: any,
    ) {
        try {
            const group: Group = await this.groupService.create(createDto);

            this.apiSuccessResponse({ res, req, data: group });
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
            const updateResult: UpdateResult = await this.groupService.updateOneById(
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
                await this.groupService.deleteSoftOneById(id);

            this.apiSuccessResponse({ res, req, data: deleteResult });
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }
}
