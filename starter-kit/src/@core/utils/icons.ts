import {GENDER} from '@/globals/enums/enums'

export const genderIcon = (gender: GENDER) => {
  if (gender === GENDER.MALE)
    return 'mdi-gender-male'
  if (gender === GENDER.FEMALE)
    return 'mdi-gender-female'
  if (gender === GENDER.OTHER)
    return 'mdi-gender-non-binary'

  return 'mdi-gender-non-binary'
}
