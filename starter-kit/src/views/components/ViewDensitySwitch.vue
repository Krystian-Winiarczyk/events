<script setup lang="ts">
import {VIEW_ALIGN, VIEW_DENSITY} from '@/globals/enums/enums'

interface Props {
  modelValue: VIEW_DENSITY
  justify: VIEW_ALIGN
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: VIEW_DENSITY.DEFAULT,
  justify: VIEW_ALIGN.END,
})

defineEmits(['update:modelValue'])

const alignClass = computed(() => {
  return [`justify-${String(props.justify).toLowerCase()}`]
})
</script>

<template>
  <div class="d-flex" :class="alignClass">
    <VBtn
      :color="modelValue === VIEW_DENSITY.DEFAULT ? 'primary' : ''"
      size="small"
      class="me-1 flex-grow-1"
      @click="$emit('update:modelValue', VIEW_DENSITY.DEFAULT)"
    >
      <VIcon
        icon="mdi-view-grid"
        size="20"
      />
    </VBtn>
    <VBtn
      :color="modelValue === VIEW_DENSITY.COMPACT ? 'primary' : ''"
      size="small"
      class="me-1 flex-grow-1"
      @click="$emit('update:modelValue', VIEW_DENSITY.COMPACT)"
    >
      <VIcon
        icon="mdi-view-list"
        size="20"
      />
    </VBtn>
  </div>
</template>

<style scoped lang="scss">

</style>
