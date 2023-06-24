import { Event } from 'src/typeorm/entities/Event';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from 'src/typeorm/entities/Competition';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Competition])],
  providers: [],
  controllers: []
})
export class EventsModule {}
