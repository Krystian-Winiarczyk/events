import { BaseController } from '../../../../base/BaseController';
import { Controller, Param, ParseIntPipe, Body, Patch, Delete, Get, Req, Res } from "@nestjs/common";
import { UpdateUserProfileDto } from "../../dtos/UserProfile.dto";
import { UserProfilesService } from "../../service/user-profiles/user-profiles.service";
import { Request, Response } from 'express';

@Controller('api/user/profiles')
export class UserProfilesController extends BaseController {
    constructor(private userProfileService: UserProfilesService) {
        super();
    }

    @Get()
    async getProfiles(
        @Req() req: Request, @Res() res: Response,
    ) {
        try {
            // const data = await this.userProfileService.findAll()

            this.apiSuccessResponse(res, req, [])
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Patch(':id')
    async updateUserProfile(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserProfileDto: UpdateUserProfileDto
    ) {
        try {
            // const data = await this.userProfileService.updateUserProfile(id, updateUserProfileDto)

            this.apiSuccessResponse(res, req, [])
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Delete(':id')
    async deleteUserProfile(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            // const data = await this.userProfileService.deleteUserProfile(id)

            this.apiSuccessResponse(res, req, [])
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }
}
