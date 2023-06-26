import { GENDER } from "@/globals/enums/enums";

export declare type User = {
  avatar?: string
  name: string
  role: string
  email: string
  createdAt?: Date
}

export declare type Profile = {
  avatar?: string
  name: string
  gender?: GENDER
  socials?: Array<object>
  birth?: string
  createdAt?: Date
  user: User
}

export declare type Pet = {
  avatar?: string
  name: string
  owner: User
  gender?: GENDER
  birth?: string
  createdAt?: Date
  user: User
  profiles?: Profile
}

export declare type Role = {
  name: string
}
