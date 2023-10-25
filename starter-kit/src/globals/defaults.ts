import type {Competition, Event, Group, Sponsor, UserPet, UserProfile} from '@/globals/types/types'
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
  group: null,
}
export const defaultGroup: Group = {
  name: '',
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
  locationLong: '',
  locationLat: '',
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
