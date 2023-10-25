<script setup lang="ts">
import axiosIns from '@axios'
import EventCard from '@/views/pages/events/EventCard.vue'

const events = ref([])

const loading = ref(false)

const reloadData = async () => {
  loading.value = true

  const { data } = await axiosIns.get('/events')

  events.value = data?.items?.map((event: Event) => ({
    ...event,
  })) || []

  loading.value = false
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
      />
    </VRow>
  </div>
</template>

<style scoped>

</style>
