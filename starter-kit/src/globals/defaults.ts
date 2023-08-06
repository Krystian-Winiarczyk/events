import type {Competition, Event, Sponsor, UserPet, UserProfile} from '@/globals/types/types'
import { GENDER } from '@/globals/enums/enums'
import {User} from "@/globals/types/types";

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
  avatar: '',
  images: [],
}

export const defaultProfile: UserProfile = {
  name: '',
  firstName: '',
  lastName: '',
  nickname: '',
  gender: GENDER.MALE,
  description: '',
  birthDate: '',
  isPrimary: false,
  websiteUrl: '',
  youtubeUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  tiktokUrl: '',
  twitterUrl: '',
  avatar: '',
}

export const defaultCompetition: Competition = {
  name: '',
  regulationUrl: '',
  description: '',
}

export const defaultSponsor: Sponsor = {
  description: '',
  name: '',
  logo: null,
}

export const defaultEvent: Event = {
  name: '',
  description: '',
  locationCountry: '',
  locationCity: '',
  locationPostalCode: '',
  locationStreet: '',
  locationNumber: '',
  locationDescription: '',
  eventStartDate: '',
  eventDaysCount: 2,
  freeEntrance: true,
  mediaUrl: '',
  regulation: '',
  banner: '',
  images: [],
  regulationUrl: '',
  eventCompetitions: [],
  sponsors: [],
}
