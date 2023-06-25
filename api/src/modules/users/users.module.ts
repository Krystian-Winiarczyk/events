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

@Module({
  exports: [UsersService, UserProfilesService, UserPetsService],
  imports: [TypeOrmModule.forFeature([User, UserPet, UserProfile])],
  controllers: [UsersController, UserProfilesController, UserPetsController],
  providers: [UsersService, UserProfilesService, UserPetsService]
})
export class UsersModule { }
