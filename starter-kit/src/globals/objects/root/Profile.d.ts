import {SocialLink} from "@/globals/types/types";

export as namespace profile

export = Profile

declare class Profile {
  constructor(key: string, name: string, pronouns?: PRONOUNS, language?: LANGS, nickname?: string, dsc?: string, avatar?: string, socials?: Array<SocialLink>, friends?: Array<Profile>)
}
