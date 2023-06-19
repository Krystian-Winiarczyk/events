import {CreateUserProfileDto} from "./UserProfile.dto";

export class CreateUserDto {
    username?: string
    email: string
    phone?: string
    password: string
    confirmPassword?: string
    role?: string
    profile?: CreateUserProfileDto | any
}

export class UpdateUserDto {
    email?: string
    phone?: string
    role?: string
}
