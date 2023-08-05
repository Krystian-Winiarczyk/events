<script setup lang="ts">
import type { Ref } from 'vue'
import { requiredValidator } from '@validators'
import type { Competition } from '@/globals/types/types'
import axiosIns from '@axios'

import { useToastStore } from '@/store/toast'
import { defaultCompetition } from '@/globals/defaults'

interface Props {
  defaultCompetition?: Competition
}

const props = defineProps<Props>()

const emits = defineEmits(['close'])

const { showMessage } = useToastStore()

const competition: Ref<Competition> = ref({ ...defaultCompetition })
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true

  const item = { ...competition.value }

  setTimeout(async () => {
    try {
      let resp = null
      if (item?.id) {
        resp = await axiosIns.patch(`settings/competitions/${item.id}`, item)
      }
      else {
        resp = await axiosIns.post('settings/competitions', item)
      }

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

onMounted(() => {
  if (props.defaultCompetition)
    Object.assign(competition.value, JSON.parse(JSON.stringify(props.defaultCompetition)))
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
              <VTextField
                v-model="competition.regulationUrl"
                :rules="[requiredValidator]"
                :label="$t('RegulationUrl')"
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
