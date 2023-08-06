import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {BaseService} from "../../../../base/BaseService";
import {Event} from "../../../../typeorm/entities/Event";

@Injectable()
export class EventsService extends BaseService<Event>{
    constructor(@InjectRepository(Event) private eventsRepository: Repository<Event>) {
        super(eventsRepository, {
            eventCompetitions: {
                competition: true,
            },
            banner: true,
            images: true,
            sponsors: {
                logo: true
            }
        })
    }
}
