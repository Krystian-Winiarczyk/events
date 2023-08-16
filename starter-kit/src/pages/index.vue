<script setup lang="ts">
import type { Ref } from 'vue'

import moment from 'moment'
import { useElementVisibility } from '@vueuse/core'
import axiosIns from '@axios'
import type { Event } from '@/globals/types/types'
import { formatDate, imagePath } from '@core/utils/formatters'
import OpenEventNavbar from '@/views/components/OpenEventNavbar.vue'

const sectionHeader = ref()
const isVisibleSectionHeader = useElementVisibility(sectionHeader)

const openEvent: Ref<Event> = ref(null)
const loading = ref(false)

const { y } = useWindowScroll()

const timeToEvent = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

const loadTimeToEvent = () => {
  const eventDate = moment(openEvent.value?.eventStartDate).add(12, 'hours')
  const now = moment()

  const duration = moment.duration(eventDate.diff(now))

  timeToEvent.value = {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  }
}

const redirectToSponsorUrl = (url?: string) => {
  if (!url)
    return

  window.open(url, '_blank')
}

onMounted(async () => {
  loading.value = true

  const { data } = await axiosIns.get('/events/open-event')

  openEvent.value = data.items[0]

  loadTimeToEvent()
  setInterval(loadTimeToEvent, 1000)

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

    <div
      v-if="openEvent"
      class="mt-3"
    >
      <VRow style="background-color: rgba(var(--v-theme-surface), .5); min-height: 70vh">
        <VCol
          cols="12"
          md="6"
          order-md="1"
          order="2"
          class="d-flex justify-center align-center text-center"
        >
          <div style="max-width: 600px">
            <p class="text-primary text-h4">
              {{ openEvent.name }}
            </p>
            <p
              ref="sectionHeader"
              class="text-body-1"
            >
              {{ $filters.truncate(openEvent.description, 300) }}
            </p>

            <div class="pt-4">
              <VProgressCircular
                :size="95"
                class="mr-4"
                :width="6"
                :model-value="((100 - (timeToEvent.days)) / 100) * 100"
                color="primary"
              >
                <div class="d-flex flex-column">
                  <span>{{ timeToEvent.days }}</span>
                  <span class="mt-n1">{{ $t('Day', timeToEvent.days) }}</span>
                </div>
              </VProgressCircular>

              <VProgressCircular
                :size="95"
                class="mr-4"
                :width="6"
                :model-value="((24 - (timeToEvent.hours)) / 24) * 100"
                color="primary"
              >
                <div class="d-flex flex-column">
                  <span>{{ timeToEvent.hours }}</span>
                  <span class="mt-n1">{{ $t('Hour', timeToEvent.hours) }}</span>
                </div>
              </VProgressCircular>

              <VProgressCircular
                :size="95"
                class="mr-4"
                :width="6"
                :model-value="((60 - (timeToEvent.minutes)) / 60) * 100"
                color="primary"
              >
                <div class="d-flex flex-column">
                  <span>{{ timeToEvent.minutes }}</span>
                  <span class="mt-n1">{{ $t('Minute', timeToEvent.minutes) }}</span>
                </div>
              </VProgressCircular>

              <VProgressCircular
                :size="95"
                class="mr-4"
                :width="6"
                :model-value="((60 - (timeToEvent.seconds)) / 60) * 100"
                color="primary"
              >
                <div class="d-flex flex-column">
                  <span>{{ timeToEvent.seconds }}</span>
                  <span class="mt-n1">{{ $t('Second', timeToEvent.seconds) }}</span>
                </div>
              </VProgressCircular>
            </div>
          </div>
        </VCol>
        <VCol
          cols="12"
          md="6"
          align-self="center"
          class="text-center"
          order-md="2"
          order-sm="1"
        >
          <VImg
            class="elevation-6 rounded-circle mx-2"
            :src="imagePath(openEvent.banner)"
          />
        </VCol>
      </VRow>

      <VContainer>
        <VRow class="my-10 py-5">
          <VCol
            offset-lg="3"
            offset-md="2"
            sm="12"
            md="8"
            lg="6"
          >
            <div class="my-5">
              <span class="text-primary text-h4 border-start">
                {{ $t('AboutEvent') }}
              </span>
            </div>
            <div class="text-body-1">
              {{ openEvent.description }}
            </div>
            <!-- Event details -->
            <div class="mt-10 d-flex justify-center">
              <div class="mr-15">
                <div class="text-primary font-weight-bold">
                  <VIcon
                    icon="mdi-map"
                    class="text-primary mr-1"
                    size="30"
                  />
                  {{ $t('Where') }}?
                </div>
                <div style="width: 250px">
                  <div class="text-body-1 mt-1 mb-3">
                    {{ openEvent.locationPostalCode }} {{ openEvent.locationCity }} <br>
                    {{ openEvent.locationStreet }} {{ openEvent.locationNumber }}
                  </div>
                </div>

                <VBtn
                  class="d-block w-100 my-2"
                  variant="outlined"
                  size="small"
                >
                  <VIcon
                    icon="mdi-navigation"
                    class="mr-2"
                  />
                  Nawiguj
                </VBtn>
                <VBtn
                  class="d-block w-100 my-2"
                  variant="outlined"
                  size="small"
                >
                  <VIcon
                    icon="mdi-map-marker"
                    class="mr-2"
                  />
                  Pokaż na mapie
                </VBtn>
              </div>
              <div>
                <div class="text-primary font-weight-bold">
                  <VIcon
                    icon="mdi-calendar-star"
                    class="text-primary mr-1"
                    size="30"
                  />
                  {{ $t('When') }}?
                </div>
                <div style="width: 250px">
                  <div class="text-body-1 mt-1 mb-3">
                    {{ $t('EventStartAndWillLast', { date: formatDate(openEvent.eventStartDate), count: openEvent.eventDaysCount }) }} {{ $t('Day', openEvent.eventDaysCount) }}
                  </div>
                </div>

                <VBtn
                  class="d-block w-100 my-2"
                  variant="outlined"
                  size="small"
                >
                  <VIcon
                    icon="mdi-google"
                    class="mr-2"
                  />
                  Dodaj do google
                </VBtn>
                <VBtn
                  class="d-block w-100 my-2"
                  variant="outlined"
                  size="small"
                >
                  <VIcon
                    icon="mdi-outlook"
                    class="mr-2"
                  />
                  Dodaj do outlook
                </VBtn>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>

      <VRow style="background-color: rgba(var(--v-theme-surface), .5);">
        <VCol
          offset-lg="2"
          offset-md="1"
          sm="12"
          md="10"
          lg="8"
        >
          <div class="my-5 text-center">
            <span class="text-primary text-h4 border-center">
              {{ $t('MeetOurSponsors') }}
            </span>
          </div>

          <VRow class="mt-10">
            <VCol
              v-for="(sponsor, sponsorIndex) in openEvent.sponsors"
              :key="`meet_sponsors_card_${sponsorIndex}`"
              sm="12"
              md="6"
              lg="3"
              class="card-hovered-image"
            >
              <VHover v-slot="{ isHovering, props }">
                <VCard
                  v-bind="props"
                  class="d-flex align-center"
                  style="height: 150px; background-color: white"
                >
                  <VImg
                    class="hovered-image"
                    style="height: 120px;"
                    :src="imagePath(sponsor.logo)"
                  />

                  <VOverlay
                    :model-value="isHovering"
                    contained
                    scrim="#ffffff"
                    class="align-center justify-center text-center text-primary"
                  >
                    <div
                      class="bg-primary rounded pa-2 mx-2 cursor-pointer"
                      @click="redirectToSponsorUrl(sponsor.url)"
                    >
                      {{ sponsor.name }}
                    </div>
                  </VOverlay>
                </VCard>
              </VHover>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      {{ openEvent }}
    </div>
  </div>
</template>

<style lang="scss">
.border-start {
  position: relative !important;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -12px;
    height: 3px;
    width: 30%;
    background-color: rgb(var(--v-theme-primary)) !important;
  }
}

.border-center {
  position: relative !important;
  &::before {
    content: '';
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -12px;
    height: 3px;
    width: 40%;
    background-color: rgb(var(--v-theme-primary)) !important;
  }
}

.card-hovered-image {
  &:hover {
    .hovered-image {
      transform: scale(1.2);
    }
  }
}

.hovered-image {
  transition: all .5s;
  &:hover {
    transform: scale(1.2);
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
  authRequired: false
</route>
