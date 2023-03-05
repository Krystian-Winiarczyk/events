import { PetService } from './../../service/pet/pet.service';
import { Body, Controller, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdatePetDto } from '../../dtos/UpdatePetDto';

@Controller('pets')
export class PetController {

    constructor(private petService: PetService) { }

    @Patch(':id')
    updateUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserProfileDto: UpdatePetDto
    ) {
        this.petService.updatePet(id, updateUserProfileDto)
    }

    @Delete(':id')
    deleteUserProfile(
        @Param('id', ParseIntPipe) id: number,
    ) {
        this.petService.deletePet(id)
    }
    
}
