import { Gender } from "../../../constants/Gender";
import { User } from "../../../typeorm/entities/User";

export class CreateUserPetDto {
    name: string
    passportNumber: string

    breed?: string
    color?: string
    description?: string
    personality?: string
    birthDate?: Date
    weight?: number
    breeding?: string
    gender?: Gender

    websiteUrl?: string
    youtubeUrl?: string
    facebookUrl?: string
    instagramUrl?: string
    tiktokUrl?: string
    twitterUrl?: string

    images?: Array<File | any> | any
    user?: User | any
}

export class UpdateUserPetDto {
    name?: string
    passportNumber?: string

    breed?: string
    color?: string
    description?: string
    personality?: string
    birthDate?: Date
    weight?: number
    breeding?: string
    gender?: Gender

    websiteUrl?: string
    youtubeUrl?: string
    facebookUrl?: string
    instagramUrl?: string
    tiktokUrl?: string
    twitterUrl?: string

    images?: Array<File | any>
    user?: User | any
}
