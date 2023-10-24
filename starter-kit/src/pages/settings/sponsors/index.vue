<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { Ref } from 'vue/dist/vue'
import axiosIns from '@axios'

import SettingsCompetitionForm from '@/views/forms/SettingsCompetitionForm.vue'
import type { Sponsor } from '@/globals/types/types'
import { defaultSponsor } from '@/globals/defaults'
import SettingsSponsorForm from "@/views/forms/SettingsSponsorForm.vue";

const sponsors = ref([])
const totalItems = ref(0)
const page = ref(1)
const perPage = ref(10)

const sponsorHeaders = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'LOGO', key: 'logo', sortable: false },
  { title: 'NAME', key: 'name', sortable: false },
  { title: 'DESCRIPTION', key: 'description', sortable: false },
  { title: 'ACTION', key: 'action', sortable: false },
])

const loading = ref(false)

const isEditSponsorDialogVisible: Ref<boolean> = ref(false)
const editedSponsor: Ref<Sponsor> = ref({ ...defaultSponsor })

const reloadData = async () => {
  loading.value = true

  const params = {
    limit: perPage.value,
    page: page.value,
  }

  const { data } = await axiosIns.get('/settings/sponsors', { params })

  sponsors.value = data?.items?.map((sponsor: Sponsor) => ({
    ...sponsor,
  })) || []
  totalItems.value = data?.totalItems || 0

  loading.value = false
}

const openEditSponsor = (sponsor: Sponsor): void => {
  if (!sponsor)
    editedSponsor.value = { ...defaultSponsor }
  else
    editedSponsor.value = { ...sponsor }

  isEditSponsorDialogVisible.value = true
}

const closeSponsorModal = (sponsor: Sponsor): void => {
  isEditSponsorDialogVisible.value = false
  if (!sponsor)
    return

  reloadData()
}
</script>

<template>
  <div>
    <h4>
      Sponsors
      <VBtn
        color="primary"
        size="small"
        class="me-1"
        @click="openEditSponsor(null)"
      >
        <VIcon
          icon="mdi-plus"
          size="20"
        />
      </VBtn>
    </h4>
    <VCard>
      <VDataTableServer
        v-model:items-per-page.async="perPage"
        v-model:page.async="page"
        :must-sort="false"
        :headers="sponsorHeaders"
        :items="sponsors"
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
            @click="editedSponsor = item.raw; isEditSponsorDialogVisible = true"
          >
            <VIcon icon="mdi-edit" />
          </VBtn>
          <VBtn
            size="sm"
            class="ml-5"
            variant="plain"
            color="error"
            @click="editedSponsor = item.raw; isEditSponsorDialogVisible = true"
          >
            <VIcon icon="mdi-trash" />
          </VBtn>
        </template>
      </VDataTableServer>
    </VCard>

    <VDialog
      v-model="isEditSponsorDialogVisible"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <SettingsSponsorForm
          v-if="isEditSponsorDialogVisible"
          ref="sponsorFormRef"
          :default-sponsor="editedSponsor"
          @close="closeSponsorModal"
        />
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>

</style>
