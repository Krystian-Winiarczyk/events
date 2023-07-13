<script setup lang="ts">
import type { Ref } from 'vue'

import { VCard, VCol, VList, VListItem, VRow } from 'vuetify/components'

import type { UserPet } from '@/globals/types/types'
import { GENDER, VIEW_TYPE } from '@/globals/enums/enums'
import InformationChip from '@/views/InformationChip.vue'

interface Props {
  pets: UserPet[]
}

const props = withDefaults(defineProps<Props>(), {
  pets: () => [],
})

const emits = defineEmits(['openEdit'])
const petDetails: Ref<UserPet | null> = ref(null)

const viewType: Ref<VIEW_TYPE> = ref(VIEW_TYPE.CARD)

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Munchkin_cat_2.jpg/800px-Munchkin_cat_2.jpg',
  'https://zloteprzeboje.pl/wp-content/uploads/2022/09/EN_01099887_5551.jpg',
  'https://i.ytimg.com/vi/W04bdiz7shs/maxresdefault.jpg',
  'https://beds4dogs.pl/wp-content/uploads/2022/05/corgi.jpg',
  'https://apetete.pl/blog/wp-content/uploads/2019/08/welsh-corgi-pembroke.jpeg',
  'https://www.bubblypet.com/wp-content/uploads/2022/07/Red-merle-Border-Collie-walking-outside.jpg',
]

const getViewTypeContainer = computed(() => {
  return viewType.value === VIEW_TYPE.CARD ? VRow : VList
})

const getViewTypeContainerItem = computed(() => {
  return viewType.value === VIEW_TYPE.CARD ? VCol : VListItem
})

const getViewTypeContainerItemContent = computed(() => {
  return viewType.value === VIEW_TYPE.CARD ? VCard : 'div'
})

const openEditPet = (pet?: UserPet): void => {
  emits('openEdit', pet)
}
</script>

<template>
  <div>
    <VSlideXTransition>
      <div
        v-if="!petDetails"
        class="d-flex justify-space-between mb-2"
      >
        <VBtn
          color="primary"
          size="small"
          class="me-1"
          @click="openEditPet(null)"
        >
          <VIcon
            icon="mdi-plus"
            size="20"
          />
        </VBtn>
        <div class="d-flex justify-end">
          <VBtn
            :color="viewType === VIEW_TYPE.CARD ? 'primary' : ''"
            size="small"
            class="me-1"
            @click="viewType = VIEW_TYPE.CARD"
          >
            <VIcon
              icon="mdi-view-grid"
              size="20"
            />
          </VBtn>
          <VBtn
            :color="viewType === VIEW_TYPE.LIST ? 'primary' : ''"
            size="small"
            class="me-1"
            @click="viewType = VIEW_TYPE.LIST"
          >
            <VIcon
              icon="mdi-view-list"
              size="20"
            />
          </VBtn>
        </div>
      </div>
    </VSlideXTransition>
    <VDialogTransition mode="out-in">
      <Component
        :is="getViewTypeContainer"
        v-if="!petDetails"
        key="pet-list"
        rounded
      >
        <Component
          :is="getViewTypeContainerItem"
          v-for="(pet, petIndex) in pets"
          :key="`pet_${pet.name}`"
          sm="12"
          md="6"
          @click="petDetails = pet"
        >
          <template #prepend>
            <Avatar
              :item="pet"
              :size="50"
            />
          </template>
          <Component
            :is="getViewTypeContainerItemContent"
            class="d-flex flex-column justify-end"
            rounded="lg"
            :image="images[petIndex]"
            height="300"
          >
            <!--    START::Content    -->
            <div
              class="px-4 py-3 d-flex flex-row align-center justify-space-between gap-2"
              style="background: rgba(var(--v-theme-surface), 1)"
            >
              <!--    START::Owner Name & UserPet Name    -->
              <div class="d-flex flex-column">
                <p class="text-h6 mb-0">
                  {{ pet.name }}
                </p>
                <small>
                  <VIcon
                    icon="mdi-book"
                    size="16"
                  />
                  {{ pet.passportNumber }}

                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    {{ $t('PassportNumber') }}
                  </VTooltip>
                </small>

                <div
                  class="d-flex gap-1 flex-wrap"
                  :class="{ 'position-absolute': viewType === VIEW_TYPE.CARD }"
                  style="top: 3px; right: 6px"
                >
                  <!-- Personality -->
                  <InformationChip
                    v-if="pet.personality"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="`${pet.personality}`"
                    icon="mdi-checkbook"
                    :tooltip="$t('Personality')"
                  />
                  <!-- Birth -->
                  <InformationChip
                    v-if="pet.birthDate"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="`${pet.birthDate}`"
                    icon="mdi-cake"
                    :tooltip="$t('Birthday')"
                  />
                  <!-- Weight -->
                  <InformationChip
                    v-if="pet.weight"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="`${pet.weight} KG`"
                    icon="mdi-weight"
                    tooltip="Waga"
                  />
                  <!-- Height -->
                  <InformationChip
                    v-if="pet.height"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="`${pet.height} CM`"
                    icon="mdi-ruler"
                    :tooltip="$t('HeightAtTheWithers')"
                  />
                  <!-- Breed -->
                  <InformationChip
                    v-if="pet.breed"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="`${pet.breed}`"
                    icon="mdi-tag-heart-outline"
                    :tooltip="$t('Breed')"
                  />
                  <!-- Color -->
                  <InformationChip
                    v-if="pet.color"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="`${pet.color}`"
                    icon="mdi-palette"
                    :tooltip="$t('Color')"
                  />
                  <!-- Gender -->
                  <InformationChip
                    v-if="pet.gender"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="$t(`PetGenders.${pet.gender}`)"
                    :icon="pet.gender === GENDER.MALE ? 'mdi-gender-male' : 'mdi-gender-female'"
                    :tooltip="$t('Gender')"
                  />
                </div>
              </div>
              <!--    END::Owner Name & UserPet Name    -->

              <VBtn
                icon
                size="small"
                variant="plain"
                color="secondary"
                @click.stop="openEditPet(pet)"
              >
                <VIcon
                  icon="mdi-edit"
                  size="24"
                />
              </VBtn>
            </div>
            <!--    END::Content    -->
          </Component>
        </Component>
      </Component>

      <!-- -->
      <VRow
        v-else
        key="pet-detials"
      >
        <VCol cols="12" />

        <VCol cols="12">
          <VCard>
            <VCardTitle>
              <div class="w-100 d-flex justify-space-between align-center">
                <div>
                  <VBtn
                    size="small"
                    variant="plain"
                    icon
                    @click="petDetails = null"
                  >
                    <VIcon
                      icon="mdi-chevron-left"
                      size="22"
                    />
                  </VBtn>
                  {{ petDetails.name }}
                </div>
                <div>
                  <VBtn
                    icon="mdi-edit"
                    variant="plain"
                    size="small"
                    color="warning"
                  />
                  <VBtn
                    class="ml-2"
                    icon="mdi-trash"
                    variant="plain"
                    size="small"
                    color="danger"
                  />
                </div>
              </div>
            </VCardTitle>

            <VCardItem>
              <VRow no-gutters>
                <VCol
                  v-for="image in images"
                  :key="image"
                  sm="12"
                  :md="4"
                  class="pa-1"
                >
                  <VImg
                    style="height: 100%"
                    cover
                    :src="image"
                    class="rounded"
                  />
                </VCol>
              </VRow>
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </VDialogTransition>
  </div>
</template>

<style scoped>

</style>
