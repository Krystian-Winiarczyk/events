<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { Ref } from 'vue/dist/vue'
import axiosIns from '@axios'

import SettingsCompetitionForm from '@/views/pages/forms/SettingsCompetitionForm.vue'
import type { Event } from '@/globals/types/types'
import {defaultEvent} from '@/globals/defaults'
import EventForm from "@/views/pages/forms/EventForm.vue";

const events = ref([])
const totalItems = ref(0)
const page = ref(1)
const perPage = ref(10)

const eventHeaders = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'NAME', key: 'name', sortable: false },
  { title: 'DESCRIPTION', key: 'description', sortable: false },
  { title: 'REGULATION', key: 'regulationUrl', sortable: false },
  { title: 'ACTION', key: 'action', sortable: false },
])

const loading = ref(false)

const isEditEventDialogVisible: Ref<boolean> = ref(false)
const editedEvent: Ref<Event> = ref({ ...defaultEvent })

const reloadData = async () => {
  loading.value = true

  const params = {
    limit: perPage.value,
    page: page.value,
  }

  const { data } = await axiosIns.get('/events', { params })

  events.value = data?.items?.map(event => ({
    ...event,
  })) || []
  totalItems.value = data?.totalItems || 0

  loading.value = false
}

const openEditEvent = (event: Event): void => {
  console.log(defaultEvent)
  if (!event)
    editedEvent.value = { ...defaultEvent }
  else
    editedEvent.value = { ...event }

  isEditEventDialogVisible.value = true
}

const closeEventModal = (event: Event): void => {
  isEditEventDialogVisible.value = false
  if (!event)
    return

  const competitionIndex = events.value.findIndex((item: Event) => item.id === event.id)

  if (competitionIndex > -1)
    events.value[competitionIndex] = event
  else
    events.value.push({ ...event })
}
</script>

<template>
  <div>
    <h4>
      Events
      <VBtn
        color="primary"
        size="small"
        class="me-1"
        @click="openEditEvent(null)"
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
      :headers="eventHeaders"
      :items="events"
      :items-length="totalItems"
      :loading="loading"
      @update:options="reloadData"
    >
      <template #item.description="{ item }">
        {{ $filters.truncate(item.raw.description, 60) }}
      </template>

      <template #item.regulationUrl="{ item }">
        <div v-if="item.raw.regulationUrl">
          <VBtn
            variant="plain"
            target="_blank"
            :href="item.raw.regulationUrl"
          >
            <VIcon icon="mdi-link" />
          </VBtn>
          <VTooltip activator="parent">
            {{ item.raw.regulationUrl }}
          </VTooltip>
        </div>
        <VIcon
          v-else
          icon="mdi-minus"
        />
      </template>

      <template #item.action="{ item }">
        <VBtn
          size="sm"
          variant="plain"
          color="warning"
          @click="editedEvent = item.raw; isEditEventDialogVisible = true"
        >
          <VIcon icon="mdi-edit" />
        </VBtn>
        <VBtn
          size="sm"
          class="ml-5"
          variant="plain"
          color="error"
          @click="editedEvent = item.raw; isEditEventDialogVisible = true"
        >
          <VIcon icon="mdi-trash" />
        </VBtn>
      </template>
    </VDataTableServer>

    <VDialog
      v-model="isEditEventDialogVisible"
      fullscreen
      :scrim="false"
      :persistent="true"
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <EventForm
          v-if="isEditEventDialogVisible"
          :default-competition="editedEvent"
          @close="closeEventModal"
        />
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>

</style>
