<script setup lang="ts">
import type { Ref } from 'vue'

import axiosIns from '@axios'
import type { Event } from '@/globals/types/types'
import { imagePath } from '@core/utils/formatters'
import OpenEventNavbar from '@/views/components/OpenEventNavbar.vue'

const loading = ref(false)
const { y } = useWindowScroll()

const openEvent: Ref<Event> = ref(null)

onMounted(async () => {
  loading.value = true

  const { data } = await axiosIns.get('/events/open-event')

  openEvent.value = data.items[0]

  loading.value = false
})
</script>

<template>
  <div>
    <VAppBar
      class="py-2 bg-shades-transparent"
      scroll-behavior="hide inverted"
      scroll-threshold="25"
    >
      <VContainer>
        <OpenEventNavbar />
      </VContainer>
    </VAppBar>

    <VContainer class="py-2">
      <OpenEventNavbar />
    </VContainer>

    <div v-if="openEvent">
      <VImg
        style="max-height: 65vh"
        cover
        :src="imagePath(openEvent.banner)"
      />

      <VContainer>
        {{ openEvent }}
      </VContainer>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: blank
  authRequired: false
</route>
