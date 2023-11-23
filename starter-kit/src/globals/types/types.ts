import type { GENDER } from '@/globals/enums/enums'
import {EXCEL_FIELD_TYPE} from "@/globals/enums/enums";

export interface User {
  id?: number
  email: string
  role: string
  pets: UserPet[]
  profiles: UserProfile[]
  refreshToken: string
  name: string
  primaryProfile: UserProfile
}

export interface UserProfile {
  id?: number
  name: string

  firstName: string
  lastName: string
  nickname: string
  gender: GENDER
  description: string
  birthDate: string
  isPrimary: boolean
  websiteUrl: string
  youtubeUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  twitterUrl: string
  user?: User
  avatar: File | string | any
}

export interface UserPet {
  id?: number
  name: string
  passportNumber: string
  breed: string
  weight: number
  height: number
  color: string
  breeding: string
  personality: string
  gender: GENDER
  description: string
  birthDate: string
  websiteUrl: string
  youtubeUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  twitterUrl: string
  user?: User
  avatar: File | string | any
  images: File[] | string[] | any[]
}

// Competitions
export interface Competition {
  id?: number
  name: string
  description: string
  regulationUrl: string
  group?: Group | string | any
}

export interface Group {
  id?: number
  name: string
}

export interface Event {
  id?: number
  name: string
  description: string
  locationCountry: string
  locationCity: string
  locationPostalCode: string
  locationStreet: string
  locationNumber: string
  locationLat: string
  locationLong: string
  locationDescription: string
  eventStartDate: string
  eventDaysCount: number
  freeEntrance: boolean
  active: boolean
  draftGenerated?: boolean
  mediaUrl: string
  regulation: string
  regulationUrl: string
  banner: File | string | any
  images: File[] | string[] | any[]
  eventCompetitions: Array<EventCompetition>
  sponsors: Array<Sponsor>
}

export interface EventCompetition {
  id?: number
  competition?: Competition | string
  event?: Event
  userLimit: number
  pricePerStart: number

  active?: boolean

  signedTeams?: Array<any>
}

export interface Sponsor {
  id?: number
  name: string
  description?: string
  logo?: File | string | any
  url?: string

  active?: boolean
}

export interface UserEventCompetition {
  id?: number

  eventCompetition: EventCompetition | string | any
  event: Event | string | any
  userPet: UserPet | string | any
  userProfile: UserProfile | string | any
  user: User | string | any
}

export interface CompetitionExcelField {
  id?: number
  name: string
  type: EXCEL_FIELD_TYPE

  competition: Competition | string | any
}


export interface EventCompetitionExcelFieldDraft {
  value: string
  event: Event
  userEventCompetition: UserEventCompetition
  competitionExcelField: CompetitionExcelField
  userProfile: UserProfile
  userPet: UserPet
}
