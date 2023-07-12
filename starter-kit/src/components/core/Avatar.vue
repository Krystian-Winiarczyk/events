<script setup lang="ts">
import type { UserPet, UserProfile } from '@/globals/types/types'

interface Props {
  item: UserProfile | UserPet
  size: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 80,
})

const avatarNoImageLetters = computed(() => {
  const [firstName = '', lastName = ''] = props.item.name.split(' ')

  return `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`.trim()
})
</script>

<template>
  <div>
    <VAvatar
      :image="item.avatar"
      variant="tonal"
      class="cursor-pointer"
      color="primary"
      :size="size"
    >
      <span>{{ avatarNoImageLetters }}</span>
    </VAvatar>
  </div>
</template>

<style scoped>

</style>
