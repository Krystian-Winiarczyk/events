import { CreateUserProfileDto } from "./UserProfile.dto";
import { CreateUserPetDto } from "./UserPet.dto";

export class CreateUserDto {
    email: string
    password: string
    confirmPassword?: string
    role?: string

    profile: CreateUserProfileDto | any
    pet?: CreateUserPetDto | any
}

export class UpdateUserDto {
    email?: string
}
