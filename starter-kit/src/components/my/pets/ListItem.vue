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
  <div class="d-flex flex-column">
    <div
      class="d-flex align-center justify-center rounded-lg overflow-hidden"
      style="height: 9rem"
    >
      <img
        :src="pet.avatar"
        :alt="`The picture of the ${pet.name}`"
        class="w-100 h-100 v-img__img--cover"
      >
    </div>

    <div class="py-2 d-flex flex-row gap-2">
      <VAvatar
        :image="pet.owner.avatar"
        size="20"
        style="top: .14rem"
      />

      <div>
        <p class="font-weight-bold text-white mb-0">
          {{ pet.name }}
        </p>

        <p class="text-subtitle-2 mb-0">
          {{ pet.owner.name }}
        </p>
      </div>
    </div>
  </div>
</template>
