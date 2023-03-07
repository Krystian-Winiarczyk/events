import { CreateEventDto, UpdateEventDto } from './../../dtos/Event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Event } from 'src/typeorm/entities/Event';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>
    ) {}

    async findEvents() {
        return await this.eventRepository.find({
            relations: {
                eventCompetitions: true,
            }
        })
    }

    async findEvent(id: number) {
        return await this.eventRepository.findOne({
            where: { id },
            relations: {
                eventCompetitions: true,
            }
        })
    }

    async createEvent(createEventDetails: CreateEventDto) {
        const newEvent = this.eventRepository.create({ ...createEventDetails })

        return await this.eventRepository.save(newEvent)
    }

    async updateEvent(id: number, updateEventDetails: UpdateEventDto) {
        return await this.eventRepository.update({ id }, { ...updateEventDetails })
    }

    async deleteEvent(id: number) {
        return await this.eventRepository.delete({ id })
    }

}
