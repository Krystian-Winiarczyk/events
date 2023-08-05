import { Event } from 'src/typeorm/entities/Event';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controller/events/events.controller';
import { EventsService } from './service/events/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
