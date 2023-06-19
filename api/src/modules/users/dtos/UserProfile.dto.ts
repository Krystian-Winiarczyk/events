import {BaseDto} from "../../../base/BaseDto";
import {User} from "../../../typeorm/entities/User";

export class CreateUserProfileDto extends BaseDto {
    firstName: string
    lastName: string

    nickname?: string
    gender?: string
    description?: string
    isPrimary?: boolean
    birthDate?: Date

    user?: User | any
    avatar?: File | any
}

export class UpdateUserProfileDto extends BaseDto {
    firstName?: string
    lastName?: string
    nickname?: string
    gender?: string
    description?: string
    birthDate?: Date
    isPrimary?: boolean

    avatar?: File | any
}
