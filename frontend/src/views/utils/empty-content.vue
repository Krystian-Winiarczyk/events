<script setup lang="ts">
const props = defineProps({
  classes: { default: () => ['py-10'], type: Array },
  message: { default: 'Empty content', type: String },
})
</script>

<template>
  <div
    class="text-primary text-center"
    :class="props.classes"
  >
    <v-icon icon="mdi-circle-off-outline"></v-icon>
    {{ props.message }}
  </div>
</template>

