import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete } from "@nestjs/common";
import { CreateUserProfileDto } from "../../dtos/CreateUserProfile.dto";
import { UpdateUserProfileDto } from "../../dtos/UpdateUserProfile.dto";
import { UserProfilesService } from "../../service/user-profiles/user-profiles.service";

@Controller('users/profiles')
export class UserProfilesController {
    constructor(private userProfileService: UserProfilesService) { }

    @Patch(':id')
    updateUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserProfileDto: UpdateUserProfileDto
    ) {
        this.userProfileService.updateUserProfile(id, updateUserProfileDto)
    }

    @Delete(':id')
    deleteUserProfile(
        @Param('id', ParseIntPipe) id: number,
    ) {
        this.userProfileService.deleteUserProfile(id)
    }
}
