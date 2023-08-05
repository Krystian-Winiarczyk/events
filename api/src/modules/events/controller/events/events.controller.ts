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
import {Event} from "../../../../typeorm/entities/Event";
import {EventsService} from "../../service/events/events.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/events')
export class EventsController extends BaseController implements ControllerInterface {
    constructor(private eventsService: EventsService) {
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
            const [events, total]: [ Event[], number ] = await this.eventsService.findAll({
                pagination: this.paginationFragment(limit, page),
                where: this.resolveFilters(q),
            });

            this.apiSuccessResponse({ res, req, data: events, total });
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
            const event: Event = await this.eventsService.findOneById(id, {})

            this.apiSuccessResponse({ res, req, data: event })
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
            const event: Event = await this.eventsService.create(createDto);

            this.apiSuccessResponse({ res, req, data: event });
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
            const updateResult: UpdateResult = await this.eventsService.updateOneById(
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
                await this.eventsService.deleteSoftOneById(id);

            this.apiSuccessResponse({ res, req, data: deleteResult });
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }
}
