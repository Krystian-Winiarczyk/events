import type { Role } from '@/globals/types/types'

export class User {
  private _role: Role
  private _email: string
  private _profiles: Array<Profile>
  private _pets: Array<Pet>

  constructor(role: Role, email: string, profiles?: Array<Profile>, pets?: Array<Pet>) {
    this._role = role
    this._email = email
    this._profiles = profiles || []
    this._pets = pets || []
  }

  /*    START::Role    */
  public get role(): Role { return this._role }
  public set role(role: Role) { this._role = role }

  /*    END::Role    */

  /*    START::Email    */
  public get email(): string { return this._email }
  public set email(email: string) { this._email = email }

  /*    END::Email    */

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
