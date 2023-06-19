import { Size } from "src/constants/Size"
import { Gender } from "../../../constants/Gender";
import { User } from "../../../typeorm/entities/User";

export class CreatePetDto {
    name: string
    breed?: string
    color?: string
    description?: string
    personality?: string
    birthDate?: Date

    gender?: Gender
    size?: Size

    images?: Array<File | any>
    user?: User | any
}

export class UpdatePetDto {
    name?: string
    breed?: string
    color?: string
    description?: string
    personality?: string
    birthDate?: Date

    gender?: Gender
    size?: Size

    images?: Array<File | any>
    user?: User | any
}
