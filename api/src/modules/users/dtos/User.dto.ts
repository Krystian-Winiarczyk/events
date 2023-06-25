import { CreateUserProfileDto } from "./UserProfile.dto";
import { CreateUserPetDto } from "./UserPet.dto";
import { Role } from "../../../constants/Role";

export class CreateUserDto {
    email: string
    password: string
    confirmPassword?: string
    role?: Role

    profile?: CreateUserProfileDto | any
    pet?: CreateUserPetDto | any
}

export class UpdateUserDto {
    email?: string
}
