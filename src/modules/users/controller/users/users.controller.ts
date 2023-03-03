import { UsersService } from '../../service/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';
import { UserProfilesService } from '../../service/user-profiles/user-profiles.service';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private userProfileService: UserProfilesService,
    ) { }

    @Get()
    getUsers() {
        return this.userService.findUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number,) {
        return this.userService.findUser(id);
    }

    @Get(':id/profiles')
    getUserProfiles(@Param('userId', ParseIntPipe) userId: number,) {
        return this.userProfileService.findUserProfiles(userId);
    }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto
    ) {
        return this.userProfileService.createUserProfile(id, createUserProfileDto)
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
