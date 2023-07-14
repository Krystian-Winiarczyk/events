import type { UserPet } from '@/globals/types/types'
import { GENDER } from '@/globals/enums/enums'

export const defaultPet: UserPet = {
  name: '',
  passportNumber: '',
  breed: '',
  weight: 0,
  height: 0,
  color: '',
  breeding: '',
  personality: '',
  gender: GENDER.MALE,
  description: '',
  birthDate: '',
  websiteUrl: '',
  youtubeUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  tiktokUrl: '',
  twitterUrl: '',
  images: [],
}
