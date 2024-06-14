import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, Res} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { BaseController } from 'src/base/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { ControllerInterface } from '../../../../interfaces/Controller.interface';
import { RoleGuard } from '../../../../guard/role/role.guard';
import { Event } from "../../../../typeorm/entities/Event";
import { EventsService } from "../../service/events/events.service";
import {Request, Response} from "express";
import {
    EventCompetitionExcelFieldDraftService
} from "../../service/event-competition-excel-field-draft/event-competition-excel-field-draft.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/events')
export class EventsController extends BaseController<Event> {
    constructor(
        private eventsService: EventsService,
        private eventCompetitionExcelFieldDraftService: EventCompetitionExcelFieldDraftService,
    ) {
        super(eventsService)
    }

    @Get('open-event')
    // @Roles(Role.ADMIN)
    async getOpenEvent(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        try {
            const item: Event = await this.eventsService.findOneById(1, {});

            // const toReturnObject = await this.eventsService.findOneById(id, {})
            // await this.eventCompetitionExcelFieldDraftService.initEventDraftFields(id)

            this.apiSuccessResponse({ res, req, data: item });
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }

    @Post(':id/init-excel-draft')
    // @Roles(Role.ADMIN)
    async initExcelFile(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            await this.eventsService.updateOneById(
                id,
                { draftGenerated: true },
            );

            const toReturnObject = await this.eventsService.findOneById(id, {})
            await this.eventCompetitionExcelFieldDraftService.initEventDraftFields(id)

            this.apiSuccessResponse({ res, req, data: toReturnObject });
        } catch (error) {
            this.apiErrorResponse(res, req, error);
        }
    }
}
