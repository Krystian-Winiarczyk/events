export class CreateUserDto {
    firstName: string
    lastName: string
    nickname?: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    role?: string
}