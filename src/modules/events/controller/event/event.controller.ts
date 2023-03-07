import { CreateEventDto, UpdateEventDto } from './../../dtos/Event.dto';
import { EventService } from './../../service/event/event.service';
import { Delete, Patch } from '@nestjs/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('events')
export class EventController {

    constructor(
        private eventService: EventService
    ) {}

    @Get()
    getEvents() {
        return this.eventService.findEvents()
    }

    @Get(':id')
    getEvent(@Param('id', ParseIntPipe) id: number) {
        return this.eventService.findEvent(id)
    }

    @Post()
    createEvent(@Body() createEventDto: CreateEventDto) {
        return this.eventService.createEvent(createEventDto)
    }

    @Patch(':id')
    updateEvent(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEventDto: UpdateEventDto
    ) {
        return this.eventService.updateEvent(id, updateEventDto)
    }

    @Delete(':id')
    deleteEvent(@Param('id', ParseIntPipe) id: number) {
        return this.eventService.deleteEvent(id)
    }

}
