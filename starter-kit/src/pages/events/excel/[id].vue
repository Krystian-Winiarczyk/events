<script setup lang="ts">
import type {Ref} from 'vue'

import type {Event, EventCompetition, UserEventCompetition,} from '@/globals/types/types'

import axiosIns from '@axios'
import {useAuthStore} from '@/store/auth'
import {VIEW_ALIGN, VIEW_DENSITY} from '@/globals/enums/enums'
import ViewDensitySwitch from "@/views/components/ViewDensitySwitch.vue";

const event: Ref<Event | null> = ref(null)
const competitions: Ref<Array<any>> = ref([])
const loading = ref(false)
const selectedCompetition = ref(0)

const viewDensity = ref(VIEW_DENSITY.DEFAULT)

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const groupedCompetitions = computed(() => {
  return Object.values(competitions.value).reduce((result: { [key: string]: Array<EventCompetition> }, item: EventCompetition) => {
    const groupName = item.competition?.group?.name || 'Other'
    if (!result[groupName])
      result[groupName] = []

    result[groupName].push(item)

    return result
  }, {})
})

const groupedUserEventCompetitionByUserProfiles = (users: Array<any>) => {
  const res = users.reduce((result: { [key: string]: any }, userEventCompetition: UserEventCompetition) => {
    const profileId = String(userEventCompetition.userProfile.id)

    if (result && !result[profileId]) {
      result[profileId] = {
        ...userEventCompetition,
        userPets: [],
      }
    }
    result[profileId].userPets.push(userEventCompetition.userPet)

    return result
  }, {})

  return Object.values(res)
}

const loadEventCompetitionUsers = async (competitionId: string | number = 0) => {
  if (!competitionId)
    return [null, 'NoCompetitions']

  const params = {
    'q[event][id][eq]': route.params.id,
    'q[eventCompetition][id][eq]': competitionId,
  }

  const { data } = await axiosIns.get('/user/event/competitions', { params })

  const competitionIndex = competitions.value.findIndex(competition => competition.id === competitionId)
  if (competitionIndex > -1)
    competitions.value[competitionIndex].users = data.items
}

const reloadData = async () => {
  loading.value = true

  const [eventResponse] = await Promise.all([
    axiosIns.get(`/events/${route.params.id}`),
  ])

  if (eventResponse?.data.items?.length) {
    event.value = eventResponse?.data.items[0]

    competitions.value = event.value?.eventCompetitions.map(eventCompetition => ({ ...eventCompetition, group: eventCompetition?.competition?.group, users: [] }))

    const id = (competitions.value.length ? groupedCompetitions.value[Object.keys(groupedCompetitions.value).reverse()[0]][0].id : null)

    selectedCompetition.value = Number(id)

    await loadEventCompetitionUsers(id)
  }
  else { router.push({ name: 'events' }) }

  loading.value = false
}

// watch(selectedCompetition, async (newSelectedCompetition, oldValue) => {
//   if (newSelectedCompetition && oldValue) await loadEventCompetitionUsers(newSelectedCompetition)
// })

onMounted(() => {
  reloadData()
})
</script>

<template>
  <div v-if="event">
    <h3>
      {{ $t('SignIntoEvent') }}
    </h3>

    <VRow>
      <VCol
        cols="12"
        sm="12"
        md="4"
        lg="2"
      >
        <VCard>
          <VCardItem>
            <div
              v-for="competitionGroup in Object.keys(groupedCompetitions).reverse()"
              :key="`competition_group_${competitionGroup}`"
            >
              <h4 class="mb-1">
                {{ competitionGroup }}
              </h4>
              <VTabs
                v-model="selectedCompetition"
                direction="vertical"
                class="v-tabs-pill"
                @update:model-value="loadEventCompetitionUsers($event)"
              >
                <VTab
                  v-for="(competition, competitionIndex) in groupedCompetitions[competitionGroup]"
                  :key="`event_competition_${competitionIndex}`"
                  :value="competition.id"
                >
                  {{ competition.competition.name }}
                </VTab>
              </VTabs>
            </div>
          </VCardItem>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        sm="12"
        md="8"
        lg="10"
      >
        <VWindow
          v-model="selectedCompetition"
          direction="vertical"
          class="v-tabs-pill"
        >
          <div
            v-for="competitionGroup in Object.keys(groupedCompetitions).reverse()"
            :key="`event_competition_group_${competitionGroup}_window`"
          >
            <VWindowItem
              v-for="(competition, competitionIndex) in groupedCompetitions[competitionGroup]"
              :key="`event_competition_group_${competitionGroup}_window_${competitionIndex}`"
              :value="competition.id"
            >
              <VRow>
                <VCol
                  v-for="({ user, userPets, userProfile }, userIndex) in groupedUserEventCompetitionByUserProfiles(competition.users)"
                  :key="`event_competition_group_${competitionGroup}_window_${competitionIndex}_user_${userIndex}`"
                  sm="12"
                  md="6"
                  lg="4"
                >
                  <VCard>
                    <VCardTitle>
                      <Avatar
                        :size="viewDensity === VIEW_DENSITY.DEFAULT ? 40 : 30"
                        :item="userProfile"
                      />
                      {{ userProfile.name }}
                    </VCardTitle>

                    <VFabTransition>
                      <VCardItem :key="VIEW_DENSITY.DEFAULT" v-if="viewDensity === VIEW_DENSITY.DEFAULT">
                        <VList
                          border
                          rounded
                          density="compact"
                        >
                          <div>
                            <VListItem
                              v-for="(pet, petIndex) in userPets"
                              :key="`event_competition_group_${competitionGroup}_window_${competitionIndex}_user_${userIndex}_pets_${petIndex}`"
                            >
                              <template #prepend>
                                <Avatar
                                  size="35"
                                  :item="pet"
                                />
                              </template>
                              <VListItemTitle>
                                {{ pet.name }}
                              </VListItemTitle>
                              <VListItemSubtitle>
                                {{ pet.breed }}
                              </VListItemSubtitle>
                            </VListItem>
                          </div>
                        </VList>
                      </VCardItem>
                      <VCardText :key="VIEW_DENSITY.COMPACT" class="mt-1" v-else-if="viewDensity === VIEW_DENSITY.COMPACT">
                        <VChip
                          v-for="(pet, petIndex) in userPets"
                          :key="`event_competition_group_${competitionGroup}_window_${competitionIndex}_user_${userIndex}_pets_${petIndex}`"
                        >
                          <Avatar
                            size="25"
                            start
                            :item="pet"
                          />
                          <span>{{ pet.name }}</span>
                        </VChip>
                      </VCardText>
                    </VFabTransition>
                  </VCard>
                </VCol>
              </VRow>
            </VWindowItem>
          </div>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>

</style>
