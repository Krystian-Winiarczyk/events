<script setup lang="ts">
import { useAuthStore } from '@/stores/root/Auth'

const auth = useAuthStore()
const friends = auth.user.activeProfile.friends
</script>

<template>
  <VList
    lines="two"
    border
    rounded
  >
    <template
      v-for="(friend, index) of friends"
      :key="friend.name"
    >
      <VListItem>
        <template #prepend>
          <VAvatar :image="friend.avatar" />
        </template>

        <VListItemTitle>
          {{ friend.name }}
        </VListItemTitle>

        <VListItemSubtitle class="mt-1">
          {{ friend.dsc.split('.')[0] }}.
        </VListItemSubtitle>

        <template #append>
          <VBtn
            icon="mdi-trash"
            variant="text"
            size="small"
          />
        </template>
      </VListItem>

      <VDivider v-if="index !== friends.length - 1" />
    </template>
  </VList>
</template>
