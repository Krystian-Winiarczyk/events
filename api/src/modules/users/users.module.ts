import { UsersService } from './service/users/users.service';
import { UsersController } from './controller/users/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UserPet } from 'src/typeorm/entities/UserPet';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { UserProfilesService } from './service/user-profiles/user-profiles.service';
import { UserProfilesController } from './controller/user-profiles/user-profiles.controller';
import { PetController } from './controller/pet/pet.controller';
import { PetService } from './service/pet/pet.service';

@Module({
  exports: [UsersService, UserProfilesService, PetService],
  imports: [TypeOrmModule.forFeature([User, UserPet, UserProfile])],
  controllers: [UsersController, UserProfilesController, PetController],
  providers: [UsersService, UserProfilesService, PetService]
})
export class UsersModule { }
