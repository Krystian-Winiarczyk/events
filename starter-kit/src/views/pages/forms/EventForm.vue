<script setup lang="ts">
import type { Ref } from 'vue'
import { requiredValidator } from '@validators'
import type { Competition, Event, EventCompetition } from '@/globals/types/types'
import axiosIns from '@axios'

import { useToastStore } from '@/store/toast'
import { defaultEvent } from '@/globals/defaults'
import { imagePath } from '@core/utils/formatters'

interface Props {
  defaultEvent?: Event
}

const props = defineProps<Props>()

const emits = defineEmits(['close'])

const { showMessage } = useToastStore()

const event: Ref<Event> = ref({ ...defaultEvent })
const loading = ref(false)
const enabledLocationDescription = ref(false)
const enabledRegulation = ref(false)

const eventBannerUploadRef = ref()
const eventImageUploadRef = ref()

const eventTabs = ref(0)

const tabs = [
  { icon: 'mdi-users', title: 'BasicData' },
  { icon: 'mdi-users', title: 'Competitions' },
]

const onSubmit = async () => {
  loading.value = true

  const item = { ...event.value }

  setTimeout(async () => {
    try {
      let resp = null
      if (item?.id)
        resp = await axiosIns.patch(`events/${item.id}`, item)

      else
        resp = await axiosIns.post('events', item)

      const [updatedItem] = resp?.data?.items

      showMessage('success', 'snackbar.PetChangesSaved', 'snackbar.ChangesSaved')

      emits('close', updatedItem)
    }
    catch (err) {
      showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingPet', 'snackbar.ProblemEncountered')
    }
    finally {
      loading.value = false
    }
  }, 1000)
}

const imagePreviewSrc = (img: any) => {
  const image = img

  if (!image)
    return null

  if (image?.filename)
    return imagePath(image)

  return URL.createObjectURL(image)
}

onMounted(async () => {
  if (props.defaultEvent)
    Object.assign(event.value, JSON.parse(JSON.stringify(props.defaultEvent)))

  try {
    // load competitions
    const { data } = await axiosIns.get('/settings/competitions')

    data?.items?.forEach((competition: Competition) => {
      const eventCompetitions = event.value.eventCompetitions
      if (eventCompetitions.find((eventCompetition: EventCompetition) => eventCompetition.competition?.id === competition?.id))
        return

      event.value.eventCompetitions.push({
        competition,
        userLimit: 100,
        pricePerStart: 25,
        active: false,
      })
    })
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div>
    <div>
      <VToolbar color="primary">
        <VBtn
          icon
          variant="plain"
          @click="$emit('close')"
        >
          <VIcon
            color="white"
            icon="mdi-close"
          />
        </VBtn>

        <VToolbarTitle>
          {{ $t(event.id ? 'EditEvent' : 'CreateNewEvent') }}
        </VToolbarTitle>

        <VSpacer />

        <VToolbarItems>
          <VBtn
            variant="text"
            :loading="loading"
            @click="onSubmit"
          >
            {{ $t('Save') }}
          </VBtn>
        </VToolbarItems>
      </VToolbar>
    </div>
    <VRow>
      <VCol cols="12">
        <VTabs v-model="eventTabs">
          <VTab
            v-for="tab in tabs"
            :key="tab.icon"
          >
            <VIcon
              start
              :size="24"
              :icon="tab.icon"
            />
            <span>{{ $t(tab.title, 2) }}</span>
          </VTab>
        </VTabs>
      </VCol>
    </VRow>

    <VForm class="pet-form d-flex justify-center mx-10">
      <!-- Form Tabs -->
      <VWindow
        v-model="eventTabs"
        class="mt-2 disable-tab-transition w-100"
        :touch="false"
      >
        <!-- Details Tab -->
        <VWindowItem>
          <VRow>
            <VCol
              sm="12"
              md="6"
            >
              <VCardTitle class="text-primary my-2 mb-3">
                {{ $t('BasicData') }}
              </VCardTitle>

              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="event.name"
                    :rules="[requiredValidator]"
                    :label="$t('Name')"
                  />
                </VCol>
                <VCol cols="6">
                  <VTextField
                    v-model="event.locationCity"
                    :rules="[requiredValidator]"
                    :label="$t('LocationCity')"
                  />
                </VCol>
                <VCol cols="6">
                  <VTextField
                    v-model="event.locationPostalCode"
                    :rules="[requiredValidator]"
                    :label="$t('LocationPostalCode')"
                  />
                </VCol>
                <VCol cols="8">
                  <VTextField
                    v-model="event.locationStreet"
                    :rules="[requiredValidator]"
                    :label="$t('LocationStreet')"
                  />
                </VCol>
                <VCol cols="4">
                  <VTextField
                    v-model="event.locationNumber"
                    :rules="[requiredValidator]"
                    :label="$t('LocationNumber')"
                  />
                </VCol>
                <VCol cols="12">
                  <VCheckbox
                    v-model="enabledLocationDescription"
                    :label="$t('TurnOnLocationDescription')"
                  />

                  <VExpandTransition>
                    <VTextarea
                      v-if="enabledLocationDescription"
                      v-model="event.locationDescription"
                      rows="3"
                      :label="$t('LocationDescription')"
                    />
                  </VExpandTransition>
                </VCol>
                <VCol cols="8">
                  <AppDateTimePicker
                    v-model="event.eventStartDate"
                    :label="$t('EventStartDate')"
                    :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d' }"
                  />
                </VCol>
                <VCol cols="4">
                  <VTextField
                    v-model="event.eventDaysCount"
                    type="number"
                    :rules="[requiredValidator]"
                    :label="$t('EventDaysCount')"
                  />
                </VCol>
                <VCol cols="12">
                  <VCheckbox
                    v-model="event.freeEntrance"
                    :label="$t('FreeEntrance')"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="event.mediaUrl"
                    type="number"
                    :label="$t('MediaUrl')"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="event.regulationUrl"
                    type="number"
                    :label="$t('RegulationUrl')"
                  />
                </VCol>
                <VCol cols="12">
                  <VCheckbox
                    v-model="enabledRegulation"
                    :label="$t('ApplyRegulationContent')"
                  />

                  <VExpandTransition>
                    <VTextarea
                      v-if="enabledRegulation"
                      v-model="event.regulation"
                      rows="3"
                      :label="$t('Regulation')"
                    />
                  </VExpandTransition>
                </VCol>
              </VRow>
            </VCol>

            <!-- Images -->
            <VCol
              md="6"
              sm="12"
            >
              <VCardTitle class="text-primary my-2 mb-3">
                {{ $t('MainImage') }}
              </VCardTitle>

              <VRow>
                <VCol
                  cols="12"
                  class="d-flex align-center"
                >
                  <div>
                    <VFileInput
                      ref="eventBannerUploadRef"
                      :model-value="event.banner"
                      class="d-none"
                      show-size
                      accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
                      @update:model-value="[event.banner] = $event"
                    />
                    <VAvatar
                      :image="imagePreviewSrc(event.banner)"
                      variant="tonal"
                      class="cursor-pointer"
                      color="primary"
                      rounded
                      size="160"
                      @click="eventBannerUploadRef.click()"
                    >
                      <VIcon
                        icon="mdi-cloud-upload"
                        size="40"
                      />
                    </VAvatar>
                  </div>
                </VCol>
              </VRow>

              <VCardTitle class="text-primary my-2 mb-3">
                {{ $t('AdditionalImages') }}
              </VCardTitle>

              <VRow>
                <VCol
                  cols="12"
                  class="d-flex"
                >
                  <div class="d-flex flex-wrap">
                    <div
                      v-for="(image, index) in event.images"
                      :key="`pet_image_${index}`"
                      class="position-relative mr-1 mb-1 hover-next"
                      @click="event.images.splice(index, 1)"
                    >
                      <VAvatar
                        :image="imagePreviewSrc(image)"
                        variant="tonal"
                        color="primary"
                        rounded
                        size="160"
                      />

                      <div
                        class="display-image position-absolute h-100 w-100 rounded align-center d-flex justify-center cursor-pointer expand-transition"
                        style="top: 0; left: 0; opacity: 0"
                      >
                        <div
                          class="position-absolute h-100 w-100 bg-primary rounded"
                          style="top: 0; left: 0; opacity: .7"
                        />
                        <VIcon
                          icon="mdi-trash"
                          class="text-white"
                          size="35"
                        />
                      </div>
                    </div>
                    <VFileInput
                      ref="eventImageUploadRef"
                      class="d-none"
                      show-size
                      multiple
                      accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
                      :model-value="event.images"
                      @update:modelValue="event.images.push(...$event)"
                    />
                    <VAvatar
                      variant="tonal"
                      class="cursor-pointer mb-1"
                      color="primary"
                      rounded
                      size="160"
                      @click="eventImageUploadRef.click()"
                    >
                      <VIcon
                        icon="mdi-cloud-upload"
                        size="40"
                      />
                    </VAvatar>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VWindowItem>

        <!-- Competitions Tab -->
        <VWindowItem>
          <VRow>
            <VCol
              v-for="(competition, competitionIndex) in event.eventCompetitions"
              :key="`competition_${competitionIndex}`"
              cols="6"
              sm="6"
            >
              <VSwitch
                v-model="competition.active"
                inset
                class="bg-light-primary pa-2 rounded"
                color="primary"
                :label="competition.competition.name"
              />
              <VSlideXTransition mode="default">
                <VCard
                  :key="`card_${competitionIndex}`"
                  v-if="competition.active"
                  class="pa-5"
                >
                  <div class="d-flex">
                    <div class="flex-grow-1 mr-3">
                      <VTextField
                        v-model="competition.userLimit"
                        type="number"
                        :label="$t('UserLimit')"
                      />
                    </div>
                    <div class="flex-grow-1">
                      <VTextField
                        v-model="competition.pricePerStart"
                        type="number"
                        :label="$t('PricePerStart')"
                      />
                    </div>
                  </div>
                </VCard>
              </VSlideXTransition>
            </VCol>
          </VRow>
        </VWindowItem>
      </VWindow>
    </VForm>
  </div>
</template>

<style lang="scss">
.pet-form {
  & .pt-0 {
    .v-field__input {
      padding-top: 0 !important;
    }

    .v-input__details {
      margin-top: -20px !important;
    }
  }

  .v-list-item {
    min-height: 32px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .hover-next {
    .display-image {
      transition: all .25s;
    }

    &:hover .display-image {
      opacity: 1 !important;
    }
  }
}
</style>
