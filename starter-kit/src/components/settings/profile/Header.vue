<script setup lang="ts">
import type { User } from '@/types/types'

defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})
</script>

<template>
  <div class="d-flex flex-column align-center gap-4">
    <!--    START::Avatar    -->
    <VAvatar
      :image="user.avatar"
      size="50%"
    />
    <!--    END::Avatar    -->

    <!--    START::Name & Role    -->
    <span class="d-flex flex-column align-center">
      <p class="text-h5 mb-0">
        {{ user.name }}
      </p>

      <p class="text-subtitle mb-0">
        {{ user.role }}
      </p>
    </span>
    <!--    END::Name & Role    -->

    <!--    START::Socials Links    -->
    <div class="d-flex flex-row gap-4">
      <VAvatar
        v-for="social in user.socials"
        :key="social.type"
        :icon="`mdi-${social.type.toLowerCase()}`"
        color="secondary"
        rounded="sm"
        variant="tonal"
        size="small"
      />
    </div>
    <!--    END::Socials Links    -->
  </div>
</template>

<style lang="scss" scoped>
#container:before {
  content: '';

  position: absolute;

  width: 100%;
  height: 64vh;

  top : 0;
  left: 0;

  background: var(--fc-code-color);
}
</style>
