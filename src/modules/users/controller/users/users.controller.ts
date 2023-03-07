import { PetService } from './../../service/pet/pet.service';
import { CreatePetDto } from '../../dtos/Pet.dto';
import { UsersService } from '../../service/users/users.service';
import { CreateUserDto } from '../../dtos/User.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';
import { UserProfilesService } from '../../service/user-profiles/user-profiles.service';
import { CreateUserProfileDto } from '../../dtos/UserProfile.dto';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private userProfileService: UserProfilesService,
        private petService: PetService,
    ) { }

    @Get()
    getUsers() {
        return this.userService.findUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number,) {
        return this.userService.findUser(id);
    }

    // User profiles
    @Get(':id/profiles')
    getUserProfiles(@Param('id', ParseIntPipe) id: number,) {
        return this.userProfileService.findUserProfiles(id);
    }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto
    ) {
        return this.userProfileService.createUserProfile(id, createUserProfileDto)
    }

    // Pet profiles
    @Get(':id/pets')
    getUserPets(@Param('id', ParseIntPipe) id: number,) {
        return this.petService.findUserPets(id);
    }

    @Post(':id/pets')
    createUserPet(
        @Param('id', ParseIntPipe) id: number,
        @Body() createPetDto: CreatePetDto
    ) {
        return this.petService.createUserPet(id, createPetDto)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        const { confirmPassword, ...userDetails } = createUserDto
        return this.userService.createUser(userDetails)
    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number,) {
        this.userService.deleteUser(id)
    }
}
