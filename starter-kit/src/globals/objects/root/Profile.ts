import { LANGS, PRONOUNS } from '@/globals/enums/enums'
import type { SocialLink } from '@/globals/types/types'

// ℹ️ Random avatar to show. ONLY FOR TESTING!!!
const baseAvatar = 'https://img.freepik.com/free-psd/3d-render-cat-emoji_23-2150311911.jpg?w=1380&t=st=1688062434~exp=1688063034~hmac=b445a5fc159ad7c93b71391d554b5fff25c51d70a74621abfc4f99f7319c44ba'

export default class Profile {
  private _name: string
  private _nickname: string
  private _pronouns: PRONOUNS
  private _language: LANGS
  private _avatar: string | undefined
  private _dsc: string | undefined
  private _socials: Array<SocialLink> | undefined
  private _friends: Array<Profile> | undefined

  constructor(name: string, pronouns: PRONOUNS = PRONOUNS.FLUID, language: LANGS = LANGS.ANG, nickname?: string, dsc?: string, avatar?: string, socials?: Array<SocialLink>, friends?: Array<Profile>) {
    this._name = name
    this._nickname = nickname || name
    this._pronouns = pronouns
    this._language = language
    this._avatar = avatar || baseAvatar
    this._dsc = dsc
    this._socials = socials
    this._friends = friends
  }

  public get name(): string { return this._name }
  public set name(name: string) { this._name = name }

  public get nickname(): string { return this._nickname }
  public set nickname(nickname: string) { this._nickname = nickname }

  public get dsc(): string { return this._dsc || '' }
  public set dsc(dsc: string) { this._dsc = dsc }

  public get avatar(): string { return this._avatar || '' }
  public set avatar(avatar: string) { this._avatar = avatar }

  public get socials(): Array<SocialLink> { return this._socials || [] }
  public set socials(socials: Array<SocialLink>) { this._socials = socials }

  public get friends(): Array<Profile> { return this._friends || [] }
  public set friends(friends: Array<Profile>) { this._friends = friends }
}
