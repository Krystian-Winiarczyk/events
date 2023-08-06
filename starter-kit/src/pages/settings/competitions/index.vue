<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { Ref } from 'vue/dist/vue'
import axiosIns from '@axios'

import SettingsCompetitionForm from '@/views/forms/SettingsCompetitionForm.vue'
import type { Competition } from '@/globals/types/types'
import { defaultCompetition } from '@/globals/defaults'

const competitions = ref([])
const totalItems = ref(0)
const page = ref(1)
const perPage = ref(10)

const competitionHeaders = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'NAME', key: 'name', sortable: false },
  { title: 'DESCRIPTION', key: 'description', sortable: false },
  { title: 'ACTION', key: 'action', sortable: false },
])

const loading = ref(false)

const isEditCompetitionDialogVisible: Ref<boolean> = ref(false)
const editedCompetition: Ref<Competition> = ref({ ...defaultCompetition })

const reloadData = async () => {
  loading.value = true

  const params = {
    limit: perPage.value,
    page: page.value,
  }

  const { data } = await axiosIns.get('/settings/competitions', { params })

  competitions.value = data?.items?.map(competition => ({
    ...competition,
  })) || []
  totalItems.value = data?.totalItems || 0

  loading.value = false
}

const openEditCompetition = (competition: Competition): void => {
  if (!competition)
    editedCompetition.value = { ...defaultCompetition }
  else
    editedCompetition.value = { ...competition }

  isEditCompetitionDialogVisible.value = true
}

const closeCompetitionModal = (competition: Competition): void => {
  isEditCompetitionDialogVisible.value = false
  if (!competition)
    return

  const competitionIndex = competitions.value.findIndex((item: Competition) => item.id === competition.id)

  if (competitionIndex > -1)
    competitions.value[competitionIndex] = competition
  else
    competitions.value.push({ ...competition })
}
</script>

<template>
  <div>
    <h4>
      {{ $t('Competitions') }}
      <VBtn
        color="primary"
        size="small"
        class="me-1"
        @click="openEditCompetition(null)"
      >
        <VIcon
          icon="mdi-plus"
          size="20"
        />
      </VBtn>
    </h4>
    <VDataTableServer
      v-model:items-per-page.async="perPage"
      v-model:page.async="page"
      :must-sort="false"
      :headers="competitionHeaders"
      :items="competitions"
      :items-length="totalItems"
      :loading="loading"
      @update:options="reloadData"
    >
      <template #item.description="{ item }">
        {{ $filters.truncate(item.raw.description, 60) }}
      </template>

      <template #item.action="{ item }">
        <VBtn
          size="sm"
          variant="plain"
          color="warning"
          @click="editedCompetition = item.raw; isEditCompetitionDialogVisible = true"
        >
          <VIcon icon="mdi-edit" />
        </VBtn>
        <VBtn
          size="sm"
          class="ml-5"
          variant="plain"
          color="error"
          @click="editedCompetition = item.raw; isEditCompetitionDialogVisible = true"
        >
          <VIcon icon="mdi-trash" />
        </VBtn>
      </template>
    </VDataTableServer>

    <VDialog
      v-model="isEditCompetitionDialogVisible"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <SettingsCompetitionForm
          v-if="isEditCompetitionDialogVisible"
          ref="competitionFormRef"
          :default-competition="editedCompetition"
          @close="closeCompetitionModal"
        />
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>

</style>
