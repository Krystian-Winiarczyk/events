<script setup lang="ts">
import type { Ref } from 'vue'
import { requiredValidator } from '@validators'
import type { Competition, CompetitionExcelField, Group, UserPet } from '@/globals/types/types'
import axiosIns from '@axios'

import { useToastStore } from '@/store/toast'
import { defaultCompetition } from '@/globals/defaults'
import { EXCEL_FIELD_TYPE } from '@/globals/enums/enums'

interface Props {
  defaultCompetition?: Competition
  groups?: Array<Group>
}

const props = defineProps<Props>()

const emits = defineEmits(['close'])

const { showMessage } = useToastStore()

const competition: Ref<Competition> = ref({ ...defaultCompetition })
const loading: Ref<boolean> = ref(false)

const competitionExcelFieldsPetsPreview: Ref<UserPet[]> = ref([])

const competitionExcelFields: Ref<CompetitionExcelField[]> = ref([
  {
    id: 0,
    name: 'Zawodnik',
    type: EXCEL_FIELD_TYPE.VALUE,
  },
  {
    id: 0,
    name: 'Pupil',
    type: EXCEL_FIELD_TYPE.VALUE,
  },
])

const saveCompetitionExcelFields = async (fields: Array<any>, competitionId: number | string) => {
  try {
    const payload = fields.filter(field => field?.id !== 0).map(field => ({ ...field, competition: competitionId }))
    const resp = await axiosIns.put('settings/competition-excel-fields', payload)

    return [resp, null]
  }
  catch (err) {
    return [null, err]
  }
}

const onSubmit = async () => {
  loading.value = true

  const item = { ...competition.value }

  if (item.group)
    item.group = item.group?.id || item.group

  setTimeout(async () => {
    try {
      let resp = null
      if (item?.id)
        resp = await axiosIns.patch(`settings/competitions/${item.id}`, item)
      else
        resp = await axiosIns.post('settings/competitions', item)

      const [updatedItem] = resp?.data?.items

      console.log(updatedItem)

      const [_, err] = await saveCompetitionExcelFields(competitionExcelFields.value, updatedItem.id)
      if (err) {
        showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingPet', 'snackbar.ProblemEncountered')

        return false
      }

      showMessage('success', 'snackbar.PetChangesSaved', 'snackbar.ChangesSaved')

      emits('close', updatedItem)
    }
    catch (err) {
      showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingPet', 'snackbar.ProblemEncountered')
    }
    finally {
      loading.value = false
    }
  }, 1000)
}

const loadCompetitionEventFields = async () => {
  try {
    const resp = await axiosIns.get('settings/competition-excel-fields', {
      params: {
        'q[competition][id][eq]': String(props.defaultCompetition?.id || 0),
      },
    })

    const excelFields = (resp?.data?.items || []).sort((a, b) => a.id - b.id)

    competitionExcelFields.value.push(...excelFields.map(e => {
      const { id, name, type } = e

      return { id, name, type }
    }))
  }
  catch (err) {
    showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingPet', 'snackbar.ProblemEncountered')
  }
}

const getExcelFieldTypeIcon = (type: EXCEL_FIELD_TYPE) => {
  if (type === EXCEL_FIELD_TYPE.VALUE)
    return 'mdi-circle-edit-outline'
  if (type === EXCEL_FIELD_TYPE.SUM)
    return 'mdi-equal'
  if (type === EXCEL_FIELD_TYPE.GREATER)
    return 'mdi-greater-than'
  if (type === EXCEL_FIELD_TYPE.LESS)
    return 'mdi-less-than'

  return 'mdi-chevron-bottom'
}

const getExcelSamplePreviousValueFields = (result: any, type: EXCEL_FIELD_TYPE) => {
  return Object.values(result).reduce((total, field, currentIndex) => {
    if (currentIndex <= 1)
      return total

    if (type === EXCEL_FIELD_TYPE.SUM)
      return total + field.value
    else if (type === EXCEL_FIELD_TYPE.GREATER && field.value > total)
      return field.value
    else if (type === EXCEL_FIELD_TYPE.LESS && field.value < total || total === 0)
      return field.value

    return total
  }, 0)
}

const getExcelSample = async () => {
  try {
    const resp = await axiosIns.get('/user/pets', { params: { limit: 5, page: 1 } })

    competitionExcelFieldsPetsPreview.value = (resp.data?.items || [])
      .map((userPet: UserPet) => {
        const { user, ...pet } = userPet
        const { primaryProfile } = user

        return competitionExcelFields.value.reduce((result, item, currentIndex) => {
          const toReturn: { name: string; value: any } = {
            name: item.name,
            value: '',
          }

          if (currentIndex === 0) { toReturn.value = primaryProfile.name }
          else if (currentIndex === 1) { toReturn.value = pet.name }
          else {
            if (item.type === EXCEL_FIELD_TYPE.VALUE)
              toReturn.value = Math.round(Math.random() * 2000)
            else
              toReturn.value = getExcelSamplePreviousValueFields(result, item.type)
          }

          result[`_${currentIndex}`] = toReturn

          return result
        }, {})
      })
  }
  catch (err) {
    showMessage('error', 'snackbar.SomethingWentWrong', 'snackbar.ProblemEncountered')
  }
}

onMounted(() => {
  if (props.defaultCompetition) {
    Object.assign(competition.value, JSON.parse(JSON.stringify(props.defaultCompetition)))

    if (props.defaultCompetition?.id)
      loadCompetitionEventFields()
  }
})
</script>

<template>
  <div>
    <div>
      <VToolbar color="primary">
        <VBtn
          icon
          variant="plain"
          @click="$emit('close')"
        >
          <VIcon
            color="white"
            icon="mdi-close"
          />
        </VBtn>

        <VToolbarTitle>
          {{ $t(competition.id ? 'EditCompetition' : 'CreateNewCompetition') }}
        </VToolbarTitle>

        <VSpacer />

        <VToolbarItems>
          <VBtn
            variant="text"
            :loading="loading"
            @click="onSubmit"
          >
            {{ $t('Save') }}
          </VBtn>
        </VToolbarItems>
      </VToolbar>
    </div>
    <VForm class="pet-form d-flex justify-center mx-10">
      <VRow>
        <!-- Data -->
        <VCol
          sm="12"
          md="4"
        >
          <VCardTitle class="text-primary my-2 mb-3">
            {{ $t('BasicData') }}
          </VCardTitle>

          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="competition.name"
                :rules="[requiredValidator]"
                :label="$t('Name')"
              />
            </VCol>
            <VCol cols="12">
              <VSelect
                v-model="competition.group"
                :items="groups"
                :label="$t('Group')"
                item-title="name"
                clear-icon="mdi-close"
                clearable
                return-object
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="competition.regulationUrl"
                :rules="[requiredValidator]"
                :label="$t('CompetitionRegulation')"
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="competition.description"
                rows="10"
                :label="$t('Description')"
              />
            </VCol>
          </VRow>
        </VCol>

        <!-- Images -->
        <VCol
          md="8"
          sm="12"
        >
          <VCardTitle class="text-primary my-2 mb-3">
            {{ $t('Excel') }}
          </VCardTitle>

          <div class="d-flex justify-start justify-content-start flex-wrap">
            <VTextField
              v-for="(excelField, excelFieldIndex) in competitionExcelFields"
              :key="`excel_field_${excelFieldIndex}`"
              v-model="excelField.name"
              class="mr-3 mb-3"
              density="compact"
              :disabled="excelField.id === 0"
              style="min-width: 150px; max-width: 250px"
            >
              <template #append-inner>
                <VIcon :icon="getExcelFieldTypeIcon(excelField.type)" />
              </template>

              <VMenu activator="parent">
                <VList select-strategy="classic">
                  <VListItem
                    v-for="(item, index) in Object.keys(EXCEL_FIELD_TYPE)"
                    :key="`excel_field_${excelFieldIndex}_${index}`"
                    :value="item"
                    :active="excelField.type === item"
                    @click="excelField.type = item"
                  >
                    <template #prepend="{ isActive }">
                      <VListItemAction start>
                        <VCheckboxBtn :model-value="isActive" />
                      </VListItemAction>
                    </template>
                    <VListItemTitle>{{ $t(item.firstToUpper()) }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VTextField>

            <VBtn
              @click="competitionExcelFields.push({
                name: 'Field',
                type: EXCEL_FIELD_TYPE.VALUE,
              })"
            >
              <VIcon icon="mdi-plus" />
            </VBtn>
          </div>

          <VCardTitle class="text-primary my-2 mb-3">
            {{ $t('ExcelPreview') }}
            <VBtn
              size="small"
              @click="getExcelSample"
            >
              <VIcon icon="mdi-download" />
            </VBtn>
          </VCardTitle>

          <VTable v-if="competitionExcelFieldsPetsPreview.length">
            <thead>
              <tr>
                <th
                  v-for="(key, excelSampleFieldIndex) in Object.values(competitionExcelFieldsPetsPreview[0]).map(e => e.name)"
                  :key="`excel_sample_head_field_${excelSampleFieldIndex}`"
                  class="text-left"
                >
                  {{ key }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(excelSampleField, excelSampleFieldIndex) in competitionExcelFieldsPetsPreview"
                :key="`excel_sample_tr_field_${excelSampleFieldIndex}`"
              >
                <td
                  v-for="(excelSampleValueField, excelSampleValueFieldIndex) in Object.values(excelSampleField)"
                  :key="`excel_sample_tr_field_${excelSampleFieldIndex}_td_${excelSampleValueFieldIndex}`"
                >
                  <VTextField
                    v-model="excelSampleValueField.value"
                    density="compact"
                  />
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style lang="scss">
.pet-form {
  & .pt-0 {
    .v-field__input {
      padding-top: 0 !important;
    }

    .v-input__details {
      margin-top: -20px !important;
    }
  }

  .v-list-item {
    min-height: 32px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .hover-next {
    .display-image {
      transition: all .25s;
    }

    &:hover .display-image {
      opacity: 1 !important;
    }
  }
}
</style>
