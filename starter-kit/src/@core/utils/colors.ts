import { ROLE } from '@/globals/enums/enums'

export const roleColor = (role: ROLE) => {
  if (role === ROLE.USER)
    return 'success'
  if (role === ROLE.ADMIN)
    return 'primary'

  return 'primary'
}
