export class CreateUserDto {
    firstName: string
    lastName: string
    username?: string
    email: string
    phone?: string
    password: string
    confirmPassword?: string
    role?: string
    avatar?: any
}

export class UpdateUserDto {
    email?: string
    phone?: string
    role?: string
    avatar?: any
}
