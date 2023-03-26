import { EventRegistrationService } from './../../service/event-registration/event-registration.service';
import { BaseController } from './../../../BaseController';
import { JwtAuthGuard } from './../../../../guard/jwt-auth/jwt-auth.guard';
import { Controller, UseGuards } from '@nestjs/common';

@Controller('event-registration')
@UseGuards(JwtAuthGuard)
export class EventRegistrationController extends BaseController {
    constructor(private eventRegistrationService: EventRegistrationService) {
        super()
    }
}
