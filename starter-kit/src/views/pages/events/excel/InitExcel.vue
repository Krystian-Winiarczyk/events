<script setup lang="ts">
import { useTheme } from 'vuetify'
import * as illustrations from '@core/utils/illustrations'
import axiosIns from '@axios'

import { useToastStore } from '@/store/toast'

const emits = defineEmits(['end'])

const { showMessage } = useToastStore()
const vuetifyTheme = useTheme()
const route = useRoute()

const draftLoading = ref(false)

const initExcelDraft = async () => {
  try {
    draftLoading.value = true
    setTimeout(async () => {
      await axiosIns.post(`/events/${route.params.id}/init-excel-draft`)

      showMessage('success', 'snackbar.ExcelDraftCreate', 'snackbar.ChangesSaved')

      emits('end')
    }, 1000)
  }
  catch (err) {
    showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingSponsor', 'snackbar.ProblemEncountered')
  }
  finally {
    draftLoading.value = false
  }
}
</script>

<template>
  <VCard
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
</template>

<style scoped>

</style>
