<script setup lang="ts">
import type { UserPet, UserProfile } from '@/globals/types/types'
import { imagePath } from '@core/utils/formatters'

interface Props {
  item: UserProfile | UserPet
  size?: number | string
  rounded?: boolean
  start?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 80,
  rounded: false,
  start: false,
})

const avatarNoImageLetters = computed(() => {
  const [firstName = '', lastName = ''] = props.item.name.split(' ')

  return `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`.trim()
})
</script>

<template>
  <VAvatar
    :image="imagePath(item?.avatar || item?.logo)"
    variant="tonal"
    :rounded="rounded"
    color="primary"
    :size="size"
    :start="start"
  >
    <span style="font-size: 1rem">{{ avatarNoImageLetters }}</span>
  </VAvatar>
</template>

<style scoped>

</style>
