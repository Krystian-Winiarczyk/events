<script setup lang="ts">
import defaultAvatar from '@images/avatars/avatar-1.png'

defineProps({
  image: {
    type: [String, undefined],
    required: false,
    default: defaultAvatar,
  },

  size: {
    type: Object as () => SIZE,
    required: false,
    default: SIZE.LG,
  },
})

enum SIZE {
  SM = 'SM',
  LG = 'LG',
  XL = 'XL',
}
</script>

<template>
  <div class="position-relative">
    <VAvatar
      :image="image || defaultAvatar"
      :size="isSM ? '80vw' : '14rem'"
    />

    <VBtn
      icon="mdi-heart"
      color="primary"
      class="position-absolute"
      :size="isSM ? 'x-large' : 'large'"
    />
  </div>
</template>

<style lang="scss" scoped>
.v-avatar {
  border: 2px solid rgba(var(--v-theme-on-primary), .1);

  box-shadow: var(--v-shadow-lg-x) var(--v-shadow-lg-y) var(--v-shadow-lg-b) rgba(var(--v-shadow-lg-c), var(--v-shadow-lg-o));
}

.v-btn {
  border: 5px solid rgba(var(--v-theme-background), 1);

  bottom: 0;
  right : 1rem;
}
</style>
