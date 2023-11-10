<script setup lang="ts">
import type {Ref} from 'vue'
import {requiredValidator} from '@validators'
import type {Competition, CompetitionExcelField, Group} from '@/globals/types/types'
import axiosIns from '@axios'

import {useToastStore} from '@/store/toast'
import {defaultCompetition} from '@/globals/defaults'
import {EXCEL_FIELD_TYPE} from '@/globals/enums/enums'

interface Props {
  defaultCompetition?: Competition
  groups?: Array<Group>
}

const props = defineProps<Props>()

const emits = defineEmits(['close'])

const { showMessage } = useToastStore()

const competition: Ref<Competition> = ref({ ...defaultCompetition })
const loading: Ref<boolean> = ref(false)

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

    const excelFields = resp?.data?.items
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
  if (type === EXCEL_FIELD_TYPE.LOWER)
    return 'mdi-less-than'

  return 'mdi-chevron-bottom'
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
          md="5"
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
          md="7"
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

            <VBtn @click="competitionExcelFields.push({
              name: 'Field',
              type: EXCEL_FIELD_TYPE.VALUE,
            })">
              <VIcon icon="mdi-plus" />
            </VBtn>
          </div>
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
