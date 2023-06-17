import {BaseDto} from "../../../base/BaseDto";

export class CreateUserProfileDto extends BaseDto {
    firstName: string
    lastName: string
    user?: number
    avatar?: string | number
    isPrimary?: boolean
}

export class UpdateUserProfileDto extends BaseDto {
    firstName?: string
    lastName?: string
    isPrimary?: boolean
    avatar?: string | number
}
