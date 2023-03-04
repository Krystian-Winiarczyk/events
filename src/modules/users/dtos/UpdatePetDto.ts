import { Size } from "src/constants/Size"

export class UpdatePetDto {
    name?: string
    breed?: string
    age?: number
    size?: Size
    color?: string
    personality?: string
}