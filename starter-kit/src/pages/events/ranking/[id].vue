<script setup lang="ts">
import type { Ref } from 'vue'

import { useTheme } from 'vuetify'
import type {
  CompetitionExcelField,
  Event,
  EventCompetition,
  EventCompetitionExcelFieldDraft,
  UserPet,
  UserProfile,
} from '@/globals/types/types'

import axiosIns from '@axios'
import { useAuthStore } from '@/store/auth'
import { EXCEL_FIELD_TYPE, VIEW_DENSITY } from '@/globals/enums/enums'
import { useToastStore } from '@/store/toast'
import PlayerRow from '@/views/pages/events/excel/PlayerRow.vue'
import InitExcel from '@/views/pages/events/ranking/InitExcel.vue'
import * as illustrations from '@core/utils/illustrations'

const event: Ref<Event | null> = ref(null)
const competitions: Ref<Array<any>> = ref([])
const loading = ref(false)
const selectedCompetition = ref(0)

const viewDensity = ref(VIEW_DENSITY.DEFAULT)

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const { showMessage } = useToastStore()

const vuetifyTheme = useTheme()

const formatMilliseconds = ms => {
  const minutes = Math.floor(ms / 60000).toString().padStart(2, '0')
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')
  const milliseconds = (ms % 1000).toString().padStart(3, '0')

  return `${minutes}:${seconds}.${milliseconds}`
}

const generateUniqueId = (eventCompetitionExcelFieldDraft: EventCompetitionExcelFieldDraft): string => {
  return `${eventCompetitionExcelFieldDraft.userEventCompetition?.id}_${eventCompetitionExcelFieldDraft.userPet?.id}_${eventCompetitionExcelFieldDraft.userProfile?.id}`
}

const groupedCompetitions = computed(() => {
  return Object.values(competitions.value).reduce((result: { [key: string]: Array<EventCompetition> }, item: EventCompetition) => {
    const groupName = item.competition?.group?.name || 'Other'
    if (!result[groupName])
      result[groupName] = []

    result[groupName].push(item)

    return result
  }, {})
})

const groupedEventCompetitionExcelFieldsByUser = (excelDraftFields: Array<any>): Array<{
  userProfile: UserProfile
  userPet: UserPet
  excelFields: Array<{ index: number; competitionExcelField: CompetitionExcelField; value: string }>
}> => {
  const res = excelDraftFields.reduce((result: { [key: string]: any }, eventCompetitionExcelFieldDraft: EventCompetitionExcelFieldDraft, currentIndex: number) => {
    const uniqueId = generateUniqueId(eventCompetitionExcelFieldDraft)
    const { userProfile, userPet, competitionExcelField, value, id } = eventCompetitionExcelFieldDraft

    if (result && !result[uniqueId]) {
      result[uniqueId] = {
        userProfile,
        userPet,
        excelFields: [],
      }
    }
    result[uniqueId].excelFields.push({
      index: currentIndex,
      competitionExcelField,
      value: value || '',
      id,
    })

    return result
  }, {})

  const items = Object.values(res)

  // return items
  return JSON.parse(JSON.stringify(items)).sort((a: any, b: any) => {
    if (!a.excelFields?.length || !b.excelFields?.length)
      return -1

    let { competitionExcelField: prevExcelField, value: prevValue } = a.excelFields.at(-1)
    let { competitionExcelField: nextExcelField, value: nextValue } = b.excelFields.at(-1)

    const byType: EXCEL_FIELD_TYPE = prevExcelField.type

    if (!prevValue)
      prevValue = byType === EXCEL_FIELD_TYPE.LESS ? 99999999999 : 0

    if (!nextValue)
      nextValue = byType === EXCEL_FIELD_TYPE.LESS ? 99999999999 : 0

    console.log(byType, nextValue, prevValue)

    if (byType === EXCEL_FIELD_TYPE.LESS) {
      if (prevValue > nextValue)
        return 1
      else return -1
    }
    else {
      console.log(123)
      prevValue = prevValue > 9999 ? 0 : prevValue
      nextValue = nextValue > 9999 ? 0 : nextValue
      if (prevValue > nextValue)
        return -1
      else return 1
    }
  })

  // return items || []
}

const loadEventCompetitionDraftFields = async (competitionId: string | number = 0) => {
  if (!competitionId)
    return [null, 'NoCompetitions']

  const params = {
    'q[event][id][eq]': route.params.id,
    'q[userEventCompetition][eventCompetition][id][eq]': competitionId,
  }

  const { data } = await axiosIns.get('/event-competition-excel-field-draft', { params })

  const competitionIndex = competitions.value.findIndex(competition => competition.id === competitionId)
  if (competitionIndex > -1) {
    competitions.value[competitionIndex].excelDraftFields = data.items
    competitions.value[competitionIndex].excelDraftFieldsByUser = groupedEventCompetitionExcelFieldsByUser(data.items)
  }
}

const reloadData = async () => {
  loading.value = true

  const [eventResponse] = await Promise.all([
    axiosIns.get(`/events/${route.params.id}`),
  ])

  if (eventResponse?.data.items?.length) {
    event.value = eventResponse?.data.items[0]

    competitions.value = event.value?.eventCompetitions.map(eventCompetition => ({ ...eventCompetition, group: eventCompetition?.competition?.group, excelDraftFields: [] }))

    const id = (competitions.value.length ? groupedCompetitions.value[Object.keys(groupedCompetitions.value).reverse()[0]][0].id : null)

    selectedCompetition.value = Number(id)

    if (event.value.draftGenerated)
      await loadEventCompetitionDraftFields(id)
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
  <div
    v-if="event"
    class="pa-4"
  >
    <h3>
      {{ $t('Ranking') }}
    </h3>

    <VRow v-if="event.draftGenerated">
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
                @update:model-value="loadEventCompetitionDraftFields($event)"
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
              <VTable
                v-if="competition?.excelDraftFieldsByUser?.length"
                class="shadow-lg"
              >
                <thead>
                  <tr>
                    <th>{{ $t('Place') }}</th>
                    <th>{{ $t('Profile') }}</th>
                    <th>{{ $t('Pet') }}</th>
                    <th
                      v-for="(excelFieldHeader, excelFieldHeaderIndex) in competition.excelDraftFieldsByUser[0].excelFields"
                      :key="`excel_field_header_${excelFieldHeaderIndex}_${excelFieldHeader.index}`"
                    >
                      {{ excelFieldHeader.competitionExcelField.name }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <PlayerRow
                    v-for="(excelFieldRow, excelFieldUserRowIndex) in competition.excelDraftFieldsByUser"
                    :key="`excel_field_row_${excelFieldUserRowIndex}`"
                    :excel-field-row="excelFieldRow"
                    :index="excelFieldUserRowIndex"
                    is-view
                    @update-excel-field-value="updateExcelDraftFieldValue($event, excelFieldUserRowIndex, competition)"
                  />
                </tbody>
              </VTable>
              <VCard
                v-else
                :key="`no_card_${competitionIndex}`"
                class="d-flex flex-column justify-center align-center mx-auto"
              >
                <div class="d-lg-flex px-10 pt-5 pb-0 justify-center align-center flex-column">
                  <h2 class="pr-5 text-primary">
                    {{ $t('NoPlayers') }}
                  </h2>
                  <div v-html="illustrations.excelDraft(vuetifyTheme.current.value.colors.primary, '300px')" />
                </div>
              </VCard>
            </VWindowItem>
          </div>
        </VWindow>
      </VCol>
    </VRow>

    <InitExcel v-else />
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: blank
  authRequired: false
</route>
