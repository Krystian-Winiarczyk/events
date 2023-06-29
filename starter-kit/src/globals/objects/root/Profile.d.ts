export as namespace profile

export = Profile

declare class Profile {
  constructor(name: string, pronouns?: PRONOUNS, language?: LANGS, nickname?: string, dsc?: string, avatar?: string, socials?: Array<string>)
}
