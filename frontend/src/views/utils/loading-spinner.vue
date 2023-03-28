<script setup lang="ts">
const props = defineProps({
  classes: { default: () => ['py-10'], type: Array },
})
</script>

<template>
  <div class="text-center" :class="classes">
    <VProgressCircular
      :width="3"
      color="primary"
      indeterminate
    />
  </div>
</template>
