<script setup lang="ts">
import type { UserPet, UserProfile } from '@/globals/types/types'
import {imagePath} from "@core/utils/formatters";

interface Props {
  item: UserProfile | UserPet
  size?: number
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 80,
  rounded: false,
})

const avatarNoImageLetters = computed(() => {
  const [firstName = '', lastName = ''] = props.item.name.split(' ')

  return `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`.trim()
})

</script>

<template>
  <div>
    <VAvatar
      :image="imagePath(item.avatar)"
      variant="tonal"
      :rounded="rounded"
      color="primary"
      :size="size"
    >
      <span>{{ avatarNoImageLetters }}</span>
    </VAvatar>
  </div>
</template>

<style scoped>

</style>
