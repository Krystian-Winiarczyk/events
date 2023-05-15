<script>
import EventCard from '@/views/pages/events/event-card.vue'

export default {
  name: 'Index',
  components: { EventCard },
}
</script>

<template>
  <!-- Events list -->
  <VRow>
    <EventCard
      v-for="event of 4"
      :key="event"
    />
  </VRow>
</template>

<style scoped>

</style>
