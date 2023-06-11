<script setup lang="ts">
import type { Pet } from '@/globals/types/types'

defineProps({
  pet: {
    type: Object as () => Pet,
    required: true,
  },
})
</script>

<template>
  <VCard>
    <VAvatar :image="pet.avatar" />

    {{ pet.name }}
  </VCard>
</template>
