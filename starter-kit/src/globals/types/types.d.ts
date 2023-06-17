import { GENDER } from "@/globals/enums/enums";

export declare type User = {
  avatar?: string
  name: string
  role: string
  email: string
  gender?: GENDER
  socials?: Array<object>
  birth?: string
  createdAt?: string
}

export declare type Pet = {
  avatar?: string
  name: string
  owner: User
  gender?: GENDER
  birth?: string
  createdAt?: string
}
