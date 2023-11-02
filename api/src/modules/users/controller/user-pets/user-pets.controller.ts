import { Controller } from '@nestjs/common';
import { BaseController } from '../../../../base/BaseController';
import { UserPet } from "../../../../typeorm/entities/UserPet";
import { UserPetsService } from '../../service/user-pets/user-pets.service';

@Controller('api/user/pets')
// @UseGuards(JwtAuthGuard)
export class UserPetsController extends BaseController<UserPet> {
    constructor(private petService: UserPetsService) {
        super(petService)
    }
}
