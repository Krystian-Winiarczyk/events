import { GENDER } from "@/globals/enums/enums";

export type User = {
  email: string
  role: string
  pets: UserPet[]
  profiles: UserProfile[]
  refreshToken: string
  name: string
  primaryProfile: UserProfile
}

export type UserProfile = {
  name: string

  firstName: string
  lastName: string
  nickname: string
  gender: GENDER
  description: string
  birthDate: string
  isPrimary: boolean
  websiteUrl: string
  youtubeUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  twitterUrl: string
  user: User
  avatar: string
}

export type UserPet = {
  name: string
  passportNumber: string
  breed: string
  weight: number
  height: number
  color: string
  breeding: string
  personality: string
  gender: GENDER
  description: string
  birthDate: string
  websiteUrl: string
  youtubeUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  twitterUrl: string
  user: User
  images: string[]
}
