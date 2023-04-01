<script setup lang="ts">
const props = defineProps({
  classes: { default: () => ['py-2'], type: Array },
  message: { default: 'Empty content', type: String },
})
</script>

<template>
  <div
    class="text-primary text-center"
    :class="props.classes"
  >
    <VIcon icon="mdi-circle-off-outline"></VIcon>
    {{ props.message }}
  </div>
</template>

