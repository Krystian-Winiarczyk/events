import { PetService } from './../../service/pet/pet.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { UpdatePetDto } from '../../dtos/UpdatePetDto';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetController {

    constructor(private petService: PetService) { }

    @Get()
    getPets() {
        return this.petService.findPets();
    }

    @Patch(':id')
    updateUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePetDto: UpdatePetDto
    ) {
        this.petService.updatePet(id, updatePetDto)
    }

    @Delete(':id')
    deleteUserProfile(
        @Param('id', ParseIntPipe) id: number,
    ) {
        this.petService.deletePet(id)
    }
    
}
