<script setup lang="ts">
import type { Ref } from 'vue'
import EventCard from '@/views/pages/events/EventCard.vue'

import type { Event, EventCompetition, UserPet, UserProfile } from '@/globals/types/types'

import axiosIns from '@axios'
import { useAuthStore } from '@/store/auth'

const event: Ref<Event | null> = ref(null)
const competitionSigned: Ref<Array<EventCompetition>> = ref([])
const loading = ref(false)

const signTeamModal = ref({
  show: false,
  eventCompetition: null,
  teams: [],
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const getAllUserTeamsCombination = computed(() => {
  const { profiles = [], pets = [] } = authStore.user

  const teams: any = {}

  profiles.forEach((profile: UserProfile) => {
    teams[profile.id] = {
      pets,
      profile,
    }
  })

  return teams
})

const generateTeamIdString = (profile: UserProfile, pet: UserPet): string => {
  return `${profile.id}_${pet.id}`
}

const resolveTeamByIdString = (id: string) => {
  const { profiles = [], pets = [] } = authStore.user
  const [profileId, petId] = id.split('_')

  const profileItem = profiles.find((profile: UserProfile) => Number(profile.id) === Number(profileId))
  const petItem = pets.find((pet: UserPet) => Number(pet.id) === Number(petId))

  return { pet: petItem, profile: profileItem }
}

const reloadData = async () => {
  loading.value = true

  const { data } = await axiosIns.get(`/events/${route.params.id}`)

  if (data.items?.length) {
    event.value = data.items[0]

    competitionSigned.value = event.value?.eventCompetitions.map(eventCompetition => ({ ...eventCompetition, group: eventCompetition?.competition?.group, signedTeams: [] }))
  }
  else { router.push({ name: 'events' }) }

  loading.value = false
}

const groupedCompetitions = computed(() => {
  return Object.values(competitionSigned.value).reduce((result: { [key: string]: Array<EventCompetition> }, item: EventCompetition) => {
    const groupName = item.competition?.group?.name || 'Other'
    if (!result[groupName])
      result[groupName] = []

    result[groupName].push(item)

    return result
  }, {})
})

const groupedTeamsByProfiles = (teams: Array<any>) => {
  return Object.entries(teams.reduce((result: { [key: string]: Array<EventCompetition> }, item: EventCompetition) => {
    const groupName = item?.profile?.name || 'Other'
    if (!result[groupName])
      result[groupName] = []

    result[groupName].push(item)

    return result
  }, {})).map(([name, pets]) => ({ name, pets }))
}

const isSelectedInOtherGroup = (teamIdString: string) => {
  const currentGroupId = signTeamModal.value.eventCompetition.group?.id
  const currentCompetitionId = signTeamModal.value.eventCompetition?.id
  if (!currentGroupId)
    return false

  const competitionsInSameGroup = competitionSigned.value.filter(competition => competition.group?.id === currentGroupId && competition.id !== currentCompetitionId)

  return Boolean(competitionsInSameGroup.filter(competition => {
    return competition.signedTeams?.find(({ profile, pet }) => generateTeamIdString(profile, pet) === teamIdString)
  }).length)
}

const openAddTeamModal = (eventCompetition: EventCompetition) => {
  const teams = (eventCompetition.signedTeams || []).map(({ profile, pet }) => generateTeamIdString(profile, pet))

  signTeamModal.value = {
    show: true,
    eventCompetition,
    teams,
  }
}

const changeSignedTeam = (teamCombination: any, pet: any) => {
  const id = generateTeamIdString(teamCombination.profile, pet)

  const existOnIndex = signTeamModal.value.teams.findIndex(e => e === id)

  if (existOnIndex > -1)
    signTeamModal.value.teams.splice(existOnIndex, 1)
  else
    signTeamModal.value.teams.push(id)
}

const onSignTeams = () => {
  const teams = signTeamModal.value.teams.map(teamIdString => resolveTeamByIdString(teamIdString)).filter(Boolean)
  const competitionIndex = competitionSigned.value.findIndex(competition => competition.id === signTeamModal.value.eventCompetition.id)

  competitionSigned.value[competitionIndex].signedTeams = teams

  signTeamModal.value.show = false
}

const onSaveApply = () => {
  console.log('competitionSigned', competitionSigned.value)
  console.log('event', event.value)
}

onMounted(() => {
  reloadData()
})
</script>

<template>
  <div v-if="event">
    <h3>
      {{ $t('SignIntoEvent') }}
    </h3>
    <EventCard :event="event" />
    <h3>
      {{ $t('SelectCompetitions') }}
    </h3>

    <div
      v-for="competitionGroup in Object.keys(groupedCompetitions).reverse()"
      :key="`competition_group_${competitionGroup}`"
      class="my-6"
    >
      <h4 class="mb-1">
        {{ competitionGroup }}
      </h4>
      <VRow>
        <VCol
          v-for="(competition, competitionIndex) in groupedCompetitions[competitionGroup]"
          :key="`event_competition_${competitionIndex}`"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <VCard>
            <VCardTitle>
              <div class="d-flex justify-space-between align-items-center">
                <div>
                  {{ competition.competition.name }}
                </div>

                <VBtn
                  size="small"
                  @click="openAddTeamModal(competition)"
                >
                  <VIcon icon="mdi-plus" />
                  {{ $t('AddTeam') }}
                </VBtn>
              </div>
            </VCardTitle>

            <VDivider color="primary" />

            <VCardText>
              <div
                v-if="!competition.signedTeams?.length"
                class="text-primary text-center pt-4"
              >
                <VIcon icon="mdi-close-circle" />
                {{ $t('NoTeamsSelected') }}
              </div>

              <div v-else>
                <div
                  v-for="({ name, pets }, teamGroupIndex) in groupedTeamsByProfiles(competition.signedTeams)"
                  :key="`team_${competitionIndex}_${teamGroupIndex}`"
                  :class="teamGroupIndex !== groupedTeamsByProfiles(competition.signedTeams).length - 1 ? 'mb-5' : ''"
                >
                  <div class="mb-2">
                    <strong class="text-primary">{{ name }}</strong> {{ $t('StartsWith').toLowerCase() }}
                  </div>
                  <VChip
                    v-for="({ pet }, teamGroupPetIndex) in pets"
                    :key="`team_${competitionIndex}_${teamGroupIndex}_${teamGroupPetIndex}`"
                    class="mr-4 cursor-pointer"
                  >
                    <Avatar
                      size="30"
                      start
                      :item="pet"
                    />
                    <span>{{ pet.name }}</span>
                  </VChip>
                </div>
              </div>
            </VCardText>

            <div v-if="competition.signedTeams?.length" class="bg-light-primary py-1 px-5 d-flex justify-space-between">
              <div>{{ $t('PricePerStart') }}</div>
              <div>
                <strong>{{ $filters.priceFormat(competition.pricePerStart * competition.signedTeams.length) }}</strong>
              </div>
            </div>

          </VCard>
        </VCol>

        <VCol cols="12">
          <VBtn @click="onSaveApply">
            Save
          </VBtn>
        </VCol>
      </VRow>
    </div>

    <!-- AssignTeamModal -->
    <VDialog
      v-model="signTeamModal.show"
      transition="dialog-bottom-transition"
      width="500"
    >
      <VCard v-if="signTeamModal.show">
        <VToolbar color="primary">
          <VBtn
            icon
            variant="plain"
            @click="signTeamModal.show = false"
          >
            <VIcon
              color="white"
              icon="mdi-close"
            />
          </VBtn>

          <VToolbarTitle>
            {{ signTeamModal.eventCompetition.competition.name }}
          </VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              :loading="loading"
              @click="onSignTeams"
            >
              {{ $t('Save') }}
            </VBtn>
          </VToolbarItems>
        </VToolbar>

        <VCardText>
          <div
            v-for="(teamProfileName, teamIndex) of Object.keys(getAllUserTeamsCombination)"
            :key="`team_${teamIndex}`"
            class="mb-5"
          >
            <div class="mb-2">
              <strong class="text-primary">{{ getAllUserTeamsCombination[teamProfileName].profile.name }}</strong> {{ $t('StartsWith').toLowerCase() }}
            </div>
            <div class="d-flex align-items-center flex-wrap">
              <VChip
                v-for="(teamPet, teamPetIndex) of getAllUserTeamsCombination[teamProfileName].pets"
                :key="`team_pet_${teamPetIndex}`"
                :color="signTeamModal.teams.includes(generateTeamIdString(getAllUserTeamsCombination[teamProfileName].profile, teamPet)) ? 'primary' : ''"
                class="mr-4 cursor-pointer"
                :disabled="isSelectedInOtherGroup(generateTeamIdString(getAllUserTeamsCombination[teamProfileName].profile, teamPet))"
                @click="changeSignedTeam(getAllUserTeamsCombination[teamProfileName], teamPet)"
              >
                <Avatar
                  size="30"
                  start
                  :item="teamPet"
                />
                <span>{{ teamPet.name }}</span>
              </VChip>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>

</style>
