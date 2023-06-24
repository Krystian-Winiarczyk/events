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
  <VCard
    class="d-flex flex-column justify-end pa-2"
    rounded="lg"
    :image="pet.avatar || ''"
    height="300"
    @click="$router.push({ path: `/pets/${pet.name.toLowerCase()}` })"
  >
    <VBtn
      icon="mdi-heart"
      class="position-absolute mx-3 my-4"
      size="small"
      color="light"
      style="top: 0; right: 0;"
    />

    <!--    START::Content    -->
    <div
      class="px-4 py-3 d-flex flex-row align-center justify-space-between gap-2 rounded-lg"
      style="background: rgba(var(--v-theme-surface), .9)"
    >
      <!--    START::Owner Name & UserPet Name    -->
      <div class="d-flex flex-column">
        <p class="text-h6 text-white mb-0">
          {{ pet.name }}
        </p>

        <div class="text-subtitle-2 d-flex flex-row align-content-center gap-2">
          <VAvatar
            :image="pet.owner.avatar"
            size="16"
            style="top: .14rem"
          />

          {{ pet.owner.name }}
        </div>
      </div>
      <!--    END::Owner Name & UserPet Name    -->

      <VIcon
        icon="mdi-gender-male"
        size="34"
      />
    </div>
    <!--    END::Content    -->
  </VCard>
</template>
