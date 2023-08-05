<script setup lang="ts">
import type { Ref } from 'vue'

import { VCard, VCol, VList, VListItem, VRow } from 'vuetify/components'

import type {UserPet, UserProfile} from '@/globals/types/types'
import { GENDER, VIEW_TYPE } from '@/globals/enums/enums'
import InformationChip from '@/views/InformationChip.vue'
import {imagePath} from "@core/utils/formatters";

interface Props {
  profiles: UserProfile[]
  enableEdit?: boolean
  selectedItem?: UserProfile | null
}

const props = withDefaults(defineProps<Props>(), {
  profiles: () => [],
  enableEdit: true,
})

const emits = defineEmits(['openEdit'])
const profileDetails: Ref<UserProfile | null> = ref(null)

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

const openEditProfile = (profile?: UserProfile): void => {
  emits('openEdit', profile)
}

onMounted(() => {
  if (props.selectedItem)
    profileDetails.value = props.selectedItem
})
</script>

<template>
  <div>
    <VSlideXTransition>
      <div
        v-if="!profileDetails"
        class="d-flex justify-space-between mb-2"
      >
        <VBtn
          v-if="enableEdit"
          color="primary"
          size="small"
          class="me-1"
          @click="openEditProfile(null)"
        >
          <VIcon
            icon="mdi-plus"
            size="20"
          />
        </VBtn>
        <div v-else />
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
        v-if="!profileDetails"
        key="profile-list"
        rounded
      >
        <Component
          :is="getViewTypeContainerItem"
          v-for="(profile, profileIndex) in profiles"
          :key="`profile_${profile.name}`"
          sm="12"
          md="6"
          lg="4"
          @click="profileDetails = profile"
        >
          <template #prepend>
            <Avatar
              :item="profile"
              :size="80"
            />
          </template>
          <Component
            :is="getViewTypeContainerItemContent"
            class="d-flex flex-column justify-end img-thumbnail"
            rounded="lg"
            :image="imagePath(profile.avatar)"
            height="300"
          >
            <template #image>
              <VImg v-if="profile.avatar" :src="imagePath(profile.avatar)" cover />
              <div class="d-flex flex-grow-1 w-100 align-center justify-center text-primary" style="font-size: 2rem" v-else>
                <span v-if="profile.name">
                  {{ profile.name[0] }}
                </span>
                <VIcon icon="mdi-user" v-else />
              </div>
            </template>
            <!--    START::Content    -->
            <div
              class="px-4 py-3 d-flex flex-row align-center justify-space-between gap-2"
              style="background: rgba(var(--v-theme-surface), 1)"
            >
              <!--    START::Owner Name & UserPet Name    -->
              <div class="d-flex flex-column">
                <p class="text-h6 mb-0">
                  {{ profile.name }}
                </p>
                <small>
                  @{{ profile.nickname }}

                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    {{ $t('Nickname') }}
                  </VTooltip>
                </small>

                <div
                  class="d-flex gap-1 flex-wrap"
                  :class="{ 'position-absolute': viewType === VIEW_TYPE.CARD }"
                  style="top: 3px; right: 6px"
                >
                  <!-- Birth -->
                  <InformationChip
                    v-if="profile.birthDate"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="`${profile.birthDate}`"
                    icon="mdi-cake"
                    :tooltip="$t('Birthday')"
                  />
                  <!-- Gender -->
                  <InformationChip
                    v-if="profile.gender"
                    :only-icon="viewType === VIEW_TYPE.CARD"
                    :size="viewType === VIEW_TYPE.CARD ? 'small' : 'x-small'"
                    :value="$t(`Genders.${profile.gender}`)"
                    :icon="profile.gender === GENDER.MALE ? 'mdi-gender-male' : 'mdi-gender-female'"
                    :tooltip="$t('Gender')"
                  />
                </div>
              </div>
              <!--    END::Owner Name & UserPet Name    -->

              <VBtn
                v-if="enableEdit"
                icon
                size="small"
                variant="plain"
                color="secondary"
                @click.stop="openEditProfile(profile)"
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
        key="profile-detials"
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
                    @click="profileDetails = null"
                  >
                    <VIcon
                      icon="mdi-chevron-left"
                      size="22"
                    />
                  </VBtn>
                  {{ profileDetails.name }}
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
