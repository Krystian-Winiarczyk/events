<script setup lang="ts">
import type { Ref } from 'vue'
import axiosIns from '@axios'
import EventCard from '@/views/pages/events/EventCard.vue'
import type { Event } from '@/globals/types/types'
import { defaultEvent } from '@/globals/defaults'
import EventForm from "@/views/forms/EventForm.vue";

const events = ref([])

const loading = ref(false)
const isEditEventDialogVisible: Ref<boolean> = ref(false)
const editedEvent: Ref<Event> = ref({ ...defaultEvent })

const reloadData = async () => {
  loading.value = true

  const { data } = await axiosIns.get('/events')

  events.value = data?.items?.map((event: Event) => ({
    ...event,
  })) || []

  loading.value = false
}

const openEditEvent = (event: Event): void => {
  editedEvent.value = { ...event }
  isEditEventDialogVisible.value = true
}

const closeEventModal = (event: Event): void => {
  isEditEventDialogVisible.value = false
  if (!event)
    return

  const eventIndex = events.value.findIndex((item: Event) => item.id === event.id)

  if (eventIndex > -1)
    events.value[eventIndex] = event
}

onMounted(() => {
  reloadData()
})
</script>

<template>
  <div>
    <h4>
      {{ $t('Events') }}
    </h4>

    <VRow>
      <EventCard
        v-for="event in events"
        :key="`event_${event.id}`"
        :event="event"
        @open-edit-modal="openEditEvent(event)"
      />
    </VRow>

    <VDialog
      v-model="isEditEventDialogVisible"
      fullscreen
      :scrim="false"
      persistent
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <EventForm
          v-if="isEditEventDialogVisible"
          :default-event="editedEvent"
          @close="closeEventModal"
        />
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>

</style>
