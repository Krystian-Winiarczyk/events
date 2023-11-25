<script setup lang="ts">
import type {Ref} from 'vue'

import {useTheme} from 'vuetify'
import type {
  CompetitionExcelField,
  Event,
  EventCompetition,
  EventCompetitionExcelFieldDraft,
  UserPet,
  UserProfile,
} from '@/globals/types/types'

import axiosIns from '@axios'
import {useAuthStore} from '@/store/auth'
import {EXCEL_FIELD_TYPE, VIEW_DENSITY} from '@/globals/enums/enums'
import {useToastStore} from '@/store/toast'
import * as illustrations from '@core/utils/illustrations'

const event: Ref<Event | null> = ref(null)
const competitions: Ref<Array<any>> = ref([])
const loading = ref(false)
const draftLoading = ref(false)
const selectedCompetition = ref(0)

const viewDensity = ref(VIEW_DENSITY.DEFAULT)

const route = useRoute()
const router = useRouter()

const vuetifyTheme = useTheme()
const authStore = useAuthStore()
const { showMessage } = useToastStore()

const updateExcelDraftFieldValue = async (payload: Array<{ id: string | number, value: string }>): Promise<any> => {
  try {
    const { data } = await axiosIns.put(`/event-competition-excel-field-draft`, payload)

    console.log(data)
    showMessage('success', 'snackbar.ExcelDraftCreate', 'snackbar.ChangesSaved')
  } catch (err) {
    showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingSponsor', 'snackbar.ProblemEncountered')
  } finally {

  }
}

const generateUniqueId = (eventCompetitionExcelFieldDraft: EventCompetitionExcelFieldDraft): string => {
  return `${eventCompetitionExcelFieldDraft.userEventCompetition.id}_${eventCompetitionExcelFieldDraft.userPet.id}_${eventCompetitionExcelFieldDraft.userProfile.id}`
}

const getTotalValue = (value: string, type: string): number | null => {
  if (!value) return null

  if (type === 'TIME_LONG') {
    const [minutes, seconds, milliseconds] = value.split(/:|\./)

    return parseInt(minutes) * 60000 + parseInt(seconds) * 1000 + parseInt(milliseconds)
  }
  else if (type === 'TIME') {
    const [seconds, milliseconds] = value.split('.')

    return parseInt(seconds) * 1000 + parseInt(milliseconds)
  }
  else {
    return Number(value)
  }
}

const getCompareValue = (items: Array<any>, currentValue: string, rootType = EXCEL_FIELD_TYPE.GREATER) => {
  let type = ''
  let valueIndex = -1

  if (currentValue.includes('.') && currentValue.includes(':'))
    type = 'TIME_LONG'
  else if (currentValue.includes('.') && currentValue.length === 6)
    type = 'TIME'
  else type = 'NUMBER'

  const result = items.reduce((max, { value }, currentIndex) => {
    let total = getTotalValue(<string> value, type)

    if (total === null) total = rootType === EXCEL_FIELD_TYPE.GREATER ? 0 : 99999999

    if (rootType === EXCEL_FIELD_TYPE.GREATER) {
      valueIndex = total > max ? currentIndex : valueIndex
      return total > max ? total : max
    }
    else if (rootType === EXCEL_FIELD_TYPE.LESS) {
      valueIndex = total < max ? currentIndex : valueIndex
      return total < max ? total : max
    }
  }, getTotalValue(<string> currentValue, type))

  return valueIndex === -1 ? currentValue : items[valueIndex].value
}

const updateExcelField = async (value: any, excelField: any, _restFields: Array<any>) => {
  const restFields = JSON.parse(JSON.stringify(_restFields))
  const {competitionExcelField, index} = excelField

  const competitionIndex = competitions.value.findIndex(competition => Number(competition.id) === Number(selectedCompetition.value))
  console.log(value.target.value)

  if (competitionIndex > -1) {
    competitions.value[competitionIndex].excelDraftFields[index].value = value.target.value

    const lastField = restFields.at(-1)
    const lastFieldType = lastField.competitionExcelField.type

    restFields.splice(index, 1)
    restFields.pop()

    let resultValue = null

    if (lastFieldType === EXCEL_FIELD_TYPE.SUM)
      resultValue = restFields.reduce((a, b) => +a + +(b.value || 0), Number(value.target.value || 0))
    else if (lastFieldType === EXCEL_FIELD_TYPE.GREATER)
      resultValue = getCompareValue(restFields, value.target.value, lastFieldType)
    else if (lastFieldType === EXCEL_FIELD_TYPE.LESS)
      resultValue = getCompareValue(restFields, value.target.value, lastFieldType)

    competitions.value[competitionIndex].excelDraftFields[lastField.index].value = resultValue

    await updateExcelDraftFieldValue([
      {id: competitions.value[competitionIndex].excelDraftFields[lastField.index].id, value: resultValue},
      {id: competitions.value[competitionIndex].excelDraftFields[index].id, value: value.target.value},
    ])
  }
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
    const { userProfile, userPet, competitionExcelField, value } = eventCompetitionExcelFieldDraft

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
    })

    return result
  }, {})

    // .sort((a: any, b: any) => {
    //   if (!a.excelFields?.length || !b.excelFields?.length) return -1
    //
    //   const { competitionExcelField: prevExcelField, value: prevValue } = a.excelFields.at(-1)
    //   const { competitionExcelField: nextExcelField, value: nextValue } = b.excelFields.at(-1)
    //
    //   const byType: EXCEL_FIELD_TYPE = prevExcelField.type
    //
    //   if (byType === EXCEL_FIELD_TYPE.LESS) {
    //     if (prevValue > nextValue) return 1
    //     else return -1
    //   } else {
    //     if (prevValue > nextValue) return 1
    //     else return -1
    //   }
    // })

  return Object.values(res) || []
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
  if (competitionIndex > -1)
    competitions.value[competitionIndex].excelDraftFields = data.items
}

const initExcelDraft = async () => {
  try {
    draftLoading.value = true
    setTimeout(async () => {
      await axiosIns.post(`/events/${route.params.id}/init-excel-draft`)

      showMessage('success', 'snackbar.ExcelDraftCreate', 'snackbar.ChangesSaved')
      event.value.draftGenerated = true

      const id = (competitions.value.length ? groupedCompetitions.value[Object.keys(groupedCompetitions.value).reverse()[0]][0].id : null)

      await loadEventCompetitionDraftFields(id)
    }, 1000)
  }
  catch (err) {
    showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingSponsor', 'snackbar.ProblemEncountered')
  }
  finally {
    draftLoading.value = false
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
  <div v-if="event">
    <h3>
      {{ $t('SignIntoEvent') }}
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
              <VTable v-if="groupedEventCompetitionExcelFieldsByUser(competition.excelDraftFields).length">
                <thead>
                  <tr>
                    <th>{{ $t('Profile') }}</th>
                    <th>{{ $t('Pet') }}</th>
                    <th
                      v-for="(excelFieldHeader, excelFieldHeaderIndex) in groupedEventCompetitionExcelFieldsByUser(competition.excelDraftFields)[0].excelFields"
                      :key="`excel_field_header_${excelFieldHeaderIndex}_${excelFieldHeader.index}`"
                    >
                      {{ excelFieldHeader.competitionExcelField.name }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(excelFieldRow, excelFieldRowIndex) in groupedEventCompetitionExcelFieldsByUser(competition.excelDraftFields)"
                    :key="`excel_field_row_${excelFieldRowIndex}`"
                  >
                    <td class="py-3">
                      <VTextField
                        density="compact"
                        :model-value="excelFieldRow.userProfile.name"
                        disabled
                      />
                    </td>
                    <td>
                      <VTextField
                        density="compact"
                        :model-value="excelFieldRow.userPet.name"
                        disabled
                      />
                    </td>
                    <td
                      v-for="(excelFieldValue, excelFieldValueIndex) in excelFieldRow.excelFields"
                      :key="`excel_field_value_${excelFieldValueIndex}_${excelFieldValue.index}`"
                    >
                      <VTextField
                        density="compact"
                        :model-value="excelFieldValue.value"
                        @blur="updateExcelField($event, excelFieldValue, excelFieldRow.excelFields)"
                      />
                    </td>
                  </tr>
                </tbody>
              </VTable><!--              <VRow> -->
              <!--                <VCol -->
              <!--                  v-for="({ competitionExcelField, userPets, userProfile }, userIndex) in groupedEventCompetitionExcelFieldsByUser(competition.excelDraftFields)" -->
              <!--                  :key="`event_competition_group_${competitionGroup}_window_${competitionIndex}_user_${userIndex}`" -->
              <!--                  sm="12" -->
              <!--                  md="6" -->
              <!--                  lg="4" -->
              <!--                > -->
              <!--                  <VCard> -->
              <!--                    <VCardTitle> -->
              <!--                      <Avatar -->
              <!--                        :size="viewDensity === VIEW_DENSITY.DEFAULT ? 40 : 30" -->
              <!--                        :item="userProfile" -->
              <!--                      /> -->
              <!--                      {{ userProfile.name }} -->
              <!--                    </VCardTitle> -->

              <!--                    <VFabTransition> -->
              <!--                      <VCardItem -->
              <!--                        v-if="viewDensity === VIEW_DENSITY.DEFAULT" -->
              <!--                        :key="VIEW_DENSITY.DEFAULT" -->
              <!--                      > -->
              <!--                        <VList -->
              <!--                          border -->
              <!--                          rounded -->
              <!--                          density="compact" -->
              <!--                        > -->
              <!--                          <div> -->
              <!--                            <VListItem -->
              <!--                              v-for="(pet, petIndex) in userPets" -->
              <!--                              :key="`event_competition_group_${competitionGroup}_window_${competitionIndex}_user_${userIndex}_pets_${petIndex}`" -->
              <!--                            > -->
              <!--                              <template #prepend> -->
              <!--                                <Avatar -->
              <!--                                  size="35" -->
              <!--                                  :item="pet" -->
              <!--                                /> -->
              <!--                              </template> -->
              <!--                              <VListItemTitle> -->
              <!--                                {{ pet.name }} -->
              <!--                              </VListItemTitle> -->
              <!--                              <VListItemSubtitle> -->
              <!--                                {{ pet.breed }} -->
              <!--                              </VListItemSubtitle> -->
              <!--                            </VListItem> -->
              <!--                          </div> -->
              <!--                        </VList> -->
              <!--                      </VCardItem> -->
              <!--                      <VCardText -->
              <!--                        v-else-if="viewDensity === VIEW_DENSITY.COMPACT" -->
              <!--                        :key="VIEW_DENSITY.COMPACT" -->
              <!--                        class="mt-1" -->
              <!--                      > -->
              <!--                        <VChip -->
              <!--                          v-for="(pet, petIndex) in userPets" -->
              <!--                          :key="`event_competition_group_${competitionGroup}_window_${competitionIndex}_user_${userIndex}_pets_${petIndex}`" -->
              <!--                        > -->
              <!--                          <Avatar -->
              <!--                            size="25" -->
              <!--                            start -->
              <!--                            :item="pet" -->
              <!--                          /> -->
              <!--                          <span>{{ pet.name }}</span> -->
              <!--                        </VChip> -->
              <!--                      </VCardText> -->
              <!--                    </VFabTransition> -->
              <!--                  </VCard> -->
              <!--                </VCol> -->
              <!--              </VRow> -->
            </VWindowItem>
          </div>
        </VWindow>
      </VCol>
    </VRow>

    <VCard
      v-else
      class="d-flex flex-column justify-center align-center mx-auto"
      style="max-width: 700px"
    >
      <div class="d-lg-flex px-10 pt-3 pb-0 align-center">
        <div class="pr-5">
          {{ $t('GenerateExcelDraftDescription') }}
        </div>
        <div v-html="illustrations.excelDraft(vuetifyTheme.current.value.colors.primary, '200px')" />
      </div>
      <VBtn
        :loading="draftLoading"
        class="w-100"
        @click="initExcelDraft"
      >
        {{ $t('GenerateExcelDraft') }}
      </VBtn>
    </VCard>
  </div>
</template>

<style scoped>

</style>
