<script setup lang="ts">
import type { Ref } from 'vue'

import { VCol, VRow, VList, VListItem } from 'vuetify/components'

import type { UserPet } from '@/globals/types/types'
import { VIEW_TYPE } from '@/globals/enums/enums'

interface Props {
  pets: UserPet[]
}

const props = withDefaults(defineProps<Props>(), {
  pets: () => [],
})

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
  return viewType.value === VIEW_TYPE.CARD ? 'VRow' : 'VList'
})

const getViewTypeContainerItem = computed(() => {
  return viewType.value === VIEW_TYPE.CARD ? 'VCol' : 'VListItem'
})
</script>

<template>
  <div>
    <VBtnGroup>
      <VBtn @click="viewType = VIEW_TYPE.CARD">
        <VIcon icon="mdi-list" />
      </VBtn>
      <VBtn @click="viewType = VIEW_TYPE.LIST">
        <VIcon icon="mdi-card" />
      </VBtn>
    </VBtnGroup>
    <VScrollXTransition>
      <Component
        :is="getViewTypeContainer"
        v-if="!petDetails"
      >
        <Component
          :is="getViewTypeContainerItem"
          v-for="(pet, petIndex) in pets"
          :key="`pet_${pet.name}`"
          sm="12"
          md="6"
          @click="petDetails = pet"
        >
          <VCard
            class="d-flex flex-column justify-end"
            rounded="lg"
            :image="images[petIndex]"
            height="300"
          >
            <div
              class="position-absolute d-flex gap-1"
              style="top: 5px; right: 10px"
            >
              <div>
                <VChip
                  v-if="pet.weight"
                  size="small"
                  color="primary"
                  variant="elevated"
                >
                  <VIcon
                    icon="mdi-weight"
                    size="14"
                  />
                  {{ pet.weight }} kg
                </VChip>
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Waga
                </VTooltip>
              </div>

              <!-- Height -->
              <div>
                <VChip
                  v-if="pet.height"
                  size="small"
                  color="primary"
                  variant="elevated"
                >
                  <VIcon icon="mdi-weight" />
                  {{ pet.height }}
                </VChip>
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  {{ $t('HeightAtTheWithers') }}
                </VTooltip>
              </div>
            </div>
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
                  <VIcon icon="mdi-book" />
                  {{ pet.passportNumber }}

                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    {{ $t('PassportNumber') }}
                  </VTooltip>
                </small>
              </div>
              <!--    END::Owner Name & UserPet Name    -->

              <VIcon
                icon="mdi-gender-male"
                size="34"
              />
            </div>
            <!--    END::Content    -->
          </VCard>
        </Component>
      </Component>

      <!-- -->
      <VRow v-else>
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
    </VScrollXTransition>
  </div>
</template>

<style scoped>

</style>
