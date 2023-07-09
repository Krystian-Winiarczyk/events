import type { Role } from '@/globals/types/types'
import type Profile from '@/globals/objects/root/Profile'

export default class User {
  private _key: string
  private _role: Role
  private _email: string
  private _activeProfile: Profile
  private _profiles: Array<Profile> | undefined
  private _pets: Array<Pet> | undefined

  constructor(key: string, role: Role, email: string, profiles: Array<Profile>, activeProfile: Profile, pets?: Array<Pet>) {
    this._key = key
    this._role = role
    this._email = email
    this._profiles = profiles
    this._activeProfile = activeProfile || profiles[0]
    this._pets = pets || undefined
  }

  public get key(): string { return this._key }
  public set key(key: string) { this._key = key }

  /*    START::Role    */
  public get role(): Role { return this._role }
  public set role(role: Role) { this._role = role }

  /*    END::Role    */

  /*    START::Email    */
  public get email(): string { return this._email }
  public set email(email: string) { this._email = email }

  /*    END::Email    */

  /*    START::Active Profile    */
  public get activeProfile(): Profile { return this._activeProfile }
  public set activeProfile(profile: Profile) { this._activeProfile = profile }

  /*    END::Active Profile    */

  /*    START::Profiles    */
  public get profiles(): Array<Profile> { return this._profiles }
  public set profiles(profile: Array<Profile>) { this._profiles = profile }
  public addProfile(profile: Profile) { this._profiles.push(profile) }

  /*    END::Profiles    */

  /*    START::Pets    */
  public get pets(): Array<Pet> { return this._pets }
  public set pets(pet: Array<Pet>) { this._pets = pet }
  public addPet(pet: Pet) { this._pets.push(pet) }

  /*    END::Pets    */
}
