import {GENDER, SOCIAL_MEDIA} from "@/globals/enums/enums";

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

// export declare type File = {
//   id: stirng
//   orgninalName: string
//   path: string
//   mimetype: string
//   createdAt?: string
// }
//
// export declare type User = {
//   id: string
//   email: string
//   phone: string
//   role: string
//   avatar?: File
//   profiles: Array<UserProfile>
//   pets: Array<Pet>
//   createdAt?: string
// }
//
// export declare type SocialMedia = {
//   id: string
//   url: string
//   type: SOCIAL_MEDIA
//   createdAt?: string
// }
//
// export declare type UserProfile = {
//   id: string
//   firstName: string
//   lastName: string
//   nickname?: string
//   gender?: GENDER
//   age?: number
//   birthDate?: string
//   socialMedias?: Array<SocialMedia>
//   createdAt?: string
// }
//
// // Pet
// export declare type Pet = {
//   id: string
//   name: string
//   user: User
//   birth?: string
//   avatar?: string
//   gender?: GENDER
//   createdAt?: string
// }
