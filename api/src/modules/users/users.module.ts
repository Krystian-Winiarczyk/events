import { UsersService } from './service/users/users.service';
import { UsersController } from './controller/users/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UserPet } from 'src/typeorm/entities/UserPet';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { UserProfilesService } from './service/user-profiles/user-profiles.service';
import { UserProfilesController } from './controller/user-profiles/user-profiles.controller';
import { UserPetsController } from './controller/user-pets/user-pets.controller';
import { UserPetsService } from './service/user-pets/user-pets.service';
import {File} from "../../typeorm/entities/File";
import { UserEventCompetitionsController } from './controller/user-event-competitions/user-event-competitions.controller';
import { UserEventCompetitionsService } from './service/user-event-competitions/user-event-competitions.service';
import {UserEventCompetition} from "../../typeorm/entities/UserEventCompetition";

@Module({
  exports: [UsersService, UserProfilesService, UserPetsService],
  imports: [TypeOrmModule.forFeature([User, UserPet, UserProfile, File, UserEventCompetition])],
  controllers: [UsersController, UserProfilesController, UserPetsController, UserEventCompetitionsController],
  providers: [UsersService, UserProfilesService, UserPetsService, UserEventCompetitionsService]
})
export class UsersModule { }
