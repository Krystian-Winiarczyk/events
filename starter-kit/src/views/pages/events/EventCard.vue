<script lang="ts" setup>
import type { Event } from '@/globals/types/types'
import { imagePath } from '@core/utils/formatters'

interface Props {
  size?: number
  event: Event
}

const props = withDefaults(defineProps<Props>(), {
  size: 6,
})

const emits = defineEmits(['open-edit-modal'])

const router = useRouter()
const route = useRoute()

const getLocation = computed(() => {
  const { event } = props

  return `${event.locationPostalCode} ${event.locationCity}, ul. ${event.locationStreet} ${event.locationNumber}`
})

const redirectToPage = page => {
  router.push(page)
}
</script>

<template>
  <VCol
    v-if="event"
    cols="12"
    :md="size"
  >
    <VCard>
      <div class="d-flex flex-column h-100 position-relative">
        <VImg
          width="100%"
          :src="imagePath(event.banner)"
          cover
          class="card-img-overlay"
        />

        <div
          class="position-absolute"
          style="right: 10px; top: 10px"
        >
          <VBtn
            class="ml-2"
            icon
            @click="redirectToPage({ name: 'events-applications-id', params: { id: event.id } })"
          >
            <VIcon icon="mdi-users" />
            <VTooltip
              activator="parent"
              location="top"
            >
              {{ $t('Players') }}
            </VTooltip>
          </VBtn>
          <VBtn
            class="ml-2"
            icon
            @click="redirectToPage({ name: 'events-excel-id', params: { id: event.id } })"
          >
            <VIcon icon="mdi-file-excel" />
            <VTooltip
              activator="parent"
              location="top"
            >
              Excel
            </VTooltip>
          </VBtn>
          <VBtn
            class="ml-2"
            icon
            @click="$emit('open-edit-modal')"
          >
            <VIcon icon="mdi-cog" />
            <VTooltip
              activator="parent"
              location="top"
            >
              {{ $t('EditEvent') }}
            </VTooltip>
          </VBtn>
        </div>
      </div>
      <VCardItem>
        <div class="d-flex justify-space-between flex-wrap">
          <div>
            <VCardTitle>{{ event.name }}</VCardTitle>
            <VCardSubtitle>
              <VIcon
                color="primary"
                icon="mdi-location"
              />
              {{ getLocation }}
            </VCardSubtitle>
          </div>
        </div>
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

      <!--      <VCardText -->
      <!--        v-if="event.active && route.name !== 'events-apply-id'" -->
      <!--        @click="redirectToPage({ name: 'events-apply-id', params: { id: props.event.id } })" -->
      <!--      > -->
      <!--        <VBtn class="w-100"> -->
      <!--          Apply -->
      <!--        </VBtn> -->
      <!--      </VCardText> -->
    </VCard>
  </VCol>
</template>

<style lang="scss" scoped>
.card-img-overlay:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(var(--v-theme-surface), .6)
  }
</style>
