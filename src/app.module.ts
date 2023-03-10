import { Event } from './typeorm/entities/Event';
import { EventRegistration } from './typeorm/entities/EventRegistration';
import { CompetitionLevel } from './typeorm/entities/CompetitionLevel';
import { Competition } from './typeorm/entities/Competition';
import { UserProfile } from './typeorm/entities/UserProfile';
import { Pet } from './typeorm/entities/Pet';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { EventCompetition } from './typeorm/entities/EventCompetition';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'main_app',
      entities: [User, Pet, UserProfile, Event, Competition, CompetitionLevel, EventRegistration, EventCompetition],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
