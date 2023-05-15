import {BaseDto} from "../../../base/BaseDto";

export class CreateUserProfileDto extends BaseDto {
    firstName: string
    lastName: string
    nickname?: string
    user?: number
    isPrimary?: boolean
}

export class UpdateUserProfileDto extends BaseDto {
    firstName?: string
    lastName?: string
    nickname?: string
    isPrimary?: boolean
}
