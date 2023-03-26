import { BaseController } from './../../../BaseController';
import { PetService } from './../../service/pet/pet.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { UpdatePetDto } from '../../dtos/Pet.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetController extends BaseController {

    constructor(private petService: PetService) { 
        super()
    }

    @Get()
    async getPets(
        @Req() req: Request, @Res() res: Response,
    ) {
        try {
            const data = await this.petService.findPets()

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }

    @Patch(':id')
    async updateUserProfile(
        @Req() req: Request, @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePetDto: UpdatePetDto
    ) {
        try {
            const data = await this.petService.updatePet(id, updatePetDto)

            this.apiSuccessResponse(res, req, data)
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
            const data = await this.petService.deletePet(id)

            this.apiSuccessResponse(res, req, data)
        } catch (error) {
            this.apiErrorResponse(res, req, error)
        }
    }
    
}
