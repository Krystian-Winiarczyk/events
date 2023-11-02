<script lang="ts" setup>
import type { Event } from '@/globals/types/types'
import { imagePath } from '@core/utils/formatters'

interface Props {
  size?: number
  event: Event
}

const router = useRouter()
const route = useRoute()

const props = withDefaults(defineProps<Props>(), {
  size: 6,
})

const getLocation = computed(() => {
  const { event } = props

  return `${event.locationPostalCode} ${event.locationCity}, ul. ${event.locationStreet} ${event.locationNumber}`
})

const routeTo = () => {
  router.push({ name: 'events-apply-id' ,  params: { id: props.event.id }})
}
</script>

<template>
  <VCol
    v-if="event"
    :md="event.active ? 12 : props.size"
    cols="12"
  >
    <VCard>
      <VRow no-gutters>
        <VCol
          cols="12"
          sm="8"
          lg="7"
          order="2"
          order-lg="1"
        >
          <VCardItem>
            <VCardTitle>{{ event.name }}</VCardTitle>
            <VCardSubtitle>
              <VIcon
                color="primary"
                icon="mdi-location"
              />
              {{ getLocation }}
            </VCardSubtitle>
          </VCardItem>

          <VCardText>
            {{ $filters.truncate(event.description, event.active ? 1000 : 400) }}
          </VCardText>

          <VCardText>
            <VDivider />
          </VCardText>

          <VCardText>
            <VChip
              v-for="competition in event.eventCompetitions"
              class="mr-1 mb-1"
              color="primary"
            >
              {{ competition.competition.name }}
            </VChip>
          </VCardText>

          <VCardText class="d-flex justify-space-between flex-wrap">
            <p class="d-flex align-center mr-5">
              <VIcon
                color="primary"
                icon="mdi-calendar-outline"
              />
              <span class="ms-1">Wydarzenie za 8 dni</span>
            </p>

            <p class="d-flex align-center mr-5">
              <VIcon
                color="primary"
                icon="mdi-clock-outline"
              />
              <span class="ms-1">Wydarzenie trwa 2 dni</span>
            </p>

            <p class="d-flex align-center mr-5">
              <VIcon
                color="primary"
                icon="mdi-lock-open-outline"
              />
              <span class="ms-1">Wstęp wolny</span>
            </p>

            <p class="d-flex align-center">
              <VIcon
                color="primary"
                icon="mdi-account-outline"
              />
              <span class="ms-1">10 sponsorów</span>
            </p>
          </VCardText>

          <VCardText v-if="event.active && route.name !== 'events-apply-id'" @click="routeTo">
            <VBtn class="w-100">
              Apply
            </VBtn>
          </VCardText>
        </VCol>

        <VCol
          cols="12"
          sm="4"
          lg="5"
          order="1"
          order-lg="2"
          class="member-pricing-bg text-center"
        >
          <div class="d-flex flex-column h-100">
            <VImg
              width="100%"
              :src="imagePath(event.banner)"
              cover
            />
          </div>
        </VCol>
      </VRow>
    </VCard>
  </VCol>
</template>

<style scoped>

</style>
