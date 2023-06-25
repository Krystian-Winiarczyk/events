import { CreateUserPetDto } from "../../users/dtos/UserPet.dto";
import { CreateUserProfileDto } from "../../users/dtos/UserProfile.dto";

export class SignupDto {
    username?: string
    email: string
    password: string
    confirmPassword?: string

    pet: CreateUserPetDto
    profile: CreateUserProfileDto
}
