import {Role} from '../../types/types'
import Profile = require('./Profile')
import Pet = require('./Pet')

export as namespace user

export = User

declare class User {
  constructor(key: string, role: Role, email: string, profiles: Array<Profile>, activeProfile?: Profile, pets?: Array<Pet>)
}
