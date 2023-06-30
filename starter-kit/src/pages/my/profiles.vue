<script setup lang="ts">
import { useAuthStore } from '@/stores/root/Auth'

const auth = useAuthStore()
const profiles = auth.user.profiles
</script>

<template>
  <VList
    lines="two"
    border
    rounded
  >
    <template
      v-for="(profile, index) of profiles"
      :key="profile.name"
    >
      <VListItem>
        <template #prepend>
          <VAvatar :image="profile.avatar" />
        </template>

        <VListItemTitle>
          {{ profile.name }}
        </VListItemTitle>

        <VListItemSubtitle class="mt-1">
          {{ profile.dsc.split('.')[0] }}
        </VListItemSubtitle>

        <template #append>
          <VBtn
            icon="mdi-trash"
            variant="text"
            size="small"
          />
        </template>
      </VListItem>

      <VDivider v-if="index !== profiles.length - 1" />
    </template>
  </VList>
</template>
