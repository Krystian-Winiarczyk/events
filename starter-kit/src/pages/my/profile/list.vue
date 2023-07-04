<script setup lang="ts">
import CpAvatar from '@/components/core/Avatar.vue'

import { useAuthStore } from "@/store/auth";
const { user } = storeToRefs(useAuthStore())

const getProfilesList = computed(() => {
  return user.value?.profiles || []
})
</script>

<template>
  <VList
    border
    rounded
  >
    <template
      v-for="(profile, index) in getProfilesList"
      :key="profile.name"
    >
      <VListItem>
        <template #prepend>
          <CpAvatar class="mr-2" :item="profile" />
        </template>

        <VListItemTitle>
          {{ profile.name }}
        </VListItemTitle>

        <VListItemSubtitle class="mt-1">
<!--          {{ profile.dsc.split('.')[0] }}.-->
        </VListItemSubtitle>

        <template #append>
          <VBtn
            icon="mdi-trash"
            variant="text"
            size="small"
          />
        </template>
      </VListItem>

      <VDivider v-if="index !== getProfilesList.length - 1" />
    </template>
  </VList>
</template>
