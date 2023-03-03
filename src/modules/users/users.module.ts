import { UsersService } from './service/users/users.service';
import { UsersController } from './controller/users/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { Pet } from 'src/typeorm/entities/Pet';
import { UserProfile } from 'src/typeorm/entities/UserProfile';
import { UserProfilesService } from './service/user-profiles/user-profiles.service';
import { UserProfilesController } from './controller/user-profiles/user-profiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, UserProfile])],
  controllers: [UsersController, UserProfilesController],
  providers: [UsersService, UserProfilesService]
})
export class UsersModule { }
