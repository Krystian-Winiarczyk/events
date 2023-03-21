import { BaseController } from './../../../BaseController';
import { CreateEventDto, UpdateEventDto } from './../../dtos/Event.dto';
import { EventService } from './../../service/event/event.service';
import { Delete, Patch, Req, Res } from '@nestjs/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('events')
export class EventController extends BaseController {

    constructor(private eventService: EventService) {
        super()
    }

    @Get()
    async getEvents(
        @Req() req: Request, @Res() res: Response,
    ) {
        try {
            const data = await this.eventService.findEvents()

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Get(':id')
    async getEvent(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data = await this.eventService.findEvent(id)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Post()
    async createEvent(
        @Req() req: Request, @Res() res: Response,
        @Body() createEventDto: CreateEventDto
    ) {
        try {
            const data = await this.eventService.createEvent(createEventDto)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Patch(':id')
    async updateEvent(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEventDto: UpdateEventDto
    ) {
        try {
            const data = await this.eventService.updateEvent(id, updateEventDto)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Delete(':id')
    async deleteEvent(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data = await this.eventService.deleteEvent(id)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

}
