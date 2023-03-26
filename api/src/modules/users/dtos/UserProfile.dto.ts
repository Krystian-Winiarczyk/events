export class CreateUserProfileDto {
    firstName: string
    lastName: string
    nickname?: string
}

export class UpdateUserProfileDto {
    firstName?: string
    lastName?: string
    nickname?: string
}