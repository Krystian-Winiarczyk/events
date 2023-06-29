import { LANGS, PRONOUNS } from '@/globals/enums/enums'

export default class Profile {
  private _name: string
  private _nickname: string
  private _pronouns: PRONOUNS
  private _language: LANGS
  private _avatar: string | undefined
  private _dsc: string | undefined
  private _socials: Array<string> | undefined

  constructor(name: string, pronouns: PRONOUNS = PRONOUNS.FLUID, language: LANGS = LANGS.ANG, nickname?: string, dsc?: string, avatar?: string, socials?: Array<string>) {
    this._name = name
    this._nickname = nickname || name
    this._pronouns = pronouns
    this._language = language
    this._avatar = avatar
    this._dsc = dsc
    this._socials = socials
  }

  public get name(): string { return this._name }
  public set name(name: string) { this._name = name }

  public get nickname(): string { return this._nickname }
  public set nickname(nickname: string) { this._nickname = nickname }
}
