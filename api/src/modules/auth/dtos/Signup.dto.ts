import {CreatePetDto} from "../../users/dtos/Pet.dto";
import {CreateUserProfileDto} from "../../users/dtos/UserProfile.dto";

export class SignupDto {
    username?: string
    email: string
    password: string
    confirmPassword?: string

    pet: CreatePetDto
    profile: CreateUserProfileDto
}
