import {SOCIAL_LINK} from "@/globals/enums/enums";

// This is a type of role
// e.g. Admin, User
export declare type Role = {
  name: string
}

// This is a type of social link
// e.g. Facebook, Instagram
export declare type SocialLink = {
  type: SOCIAL_LINK,
  url: string
}
