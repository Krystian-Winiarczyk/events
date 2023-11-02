import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { BaseController } from 'src/base/BaseController';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { ControllerInterface } from '../../../../interfaces/Controller.interface';
import { RoleGuard } from '../../../../guard/role/role.guard';
import { Event } from "../../../../typeorm/entities/Event";
import { EventsService } from "../../service/events/events.service";

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/events')
export class EventsController extends BaseController<Event> implements ControllerInterface {
    constructor(private eventsService: EventsService) {
        super(eventsService)
    }
}
