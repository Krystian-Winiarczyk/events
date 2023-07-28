<script setup lang="ts">
import {avatarText, formatDate} from '@core/utils/formatters'
import type { User } from '@/globals/types/types'
import SocialMediaList from '@/views/SocialMediaList.vue'

interface Props {
  userData: User
}

const props = defineProps<Props>()

</script>

<template>
  <VCol cols="12">
    <VCard v-if="props.userData">
      <VCardText class="text-center pt-15">
        <!-- 👉 Avatar -->
        <Avatar :item="props.userData.primaryProfile" :size="130" rounded />

        <!-- 👉 User fullName -->
        <h6 class="text-h6 mt-4">
          {{ props.userData.primaryProfile.name }}
        </h6>

        <!-- 👉 Role chip -->
        <VChip
          label
          color="primary"
          size="small"
          class="text-capitalize mt-2"
        >
          @{{ props.userData.primaryProfile.nickname }}
        </VChip>
      </VCardText>

      <VCardText class="d-flex justify-space-between flex-wrap mt-3 px-6 pb-5">
        <!-- 👉 Done task -->
        <div class="d-flex align-center me-8 mb-2">
          <VAvatar
            :size="44"
            rounded
            color="primary"
            variant="tonal"
            class="me-3"
          >
            <VIcon
              size="24"
              icon="mdi-calendar-star"
            />
          </VAvatar>

          <div>
            <h6 class="text-h6">
              0
            </h6>
            <span>Moje zawody</span>
          </div>
        </div>

        <!-- 👉 Done Project -->
        <div class="d-flex align-center me-4 mb-2">
          <VAvatar
            :size="44"
            rounded
            color="primary"
            variant="tonal"
            class="me-3"
          >
            <VIcon
              size="24"
              icon="mdi-timer-play"
            />
          </VAvatar>

          <div>
            <h6 class="text-h6">
              0
            </h6>
            <span>Moje starty</span>
          </div>
        </div>
      </VCardText>

      <!-- 👉 Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('MyData') }}
        </h6>

        <VDivider class="mt-4" />
        <!-- 👉 User Details list -->
        <VList class="card-list mt-2">
          <VListItem>
            <VListItemTitle class="text-sm">
              <span class="font-weight-medium mr-1">Email:</span>
              <span class="text-body-2">{{ props.userData.email }}</span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle class="text-sm">
              <span class="font-weight-medium mr-1">{{ $t('Gender') }}:</span>
              <span class="text-body-2">{{ $t(`Genders.${props.userData.primaryProfile.gender}`) }}</span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle class="text-sm">
              <span class="font-weight-medium mr-1">{{ $t('Birthday') }}:</span>
              <span class="text-body-2">{{ formatDate(props.userData.primaryProfile.birthDate) }}</span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle class="text-sm">
              <span class="font-weight-medium mr-1">{{ $t('Description') }}:</span>
              <span class="text-body-2">{{ props.userData.primaryProfile.description }}</span>
            </VListItemTitle>
          </VListItem>

          <VListItem>
            <VListItemTitle class="text-sm">
              <span class="font-weight-medium">Role: </span>
              <span class="text-capitalize text-body-2">{{ props.userData.role }}</span>
            </VListItemTitle>
          </VListItem>
        </VList>

        <VDivider class="mt-4" />

        <SocialMediaList class="mt-3" :item="userData.primaryProfile" />
      </VCardText>
    </VCard>
  </VCol>
</template>

<style scoped>

</style>
