<script setup lang="ts">
interface Props {
  color: string
  value: number | string
  icon: string
  onlyIcon: boolean,
  location: string
  size: string
  tooltip: string
}

const props = withDefaults(defineProps<Props>(), {
  onlyIcon: false,
  location: 'top',
  tooltip: '',
  icon: 'mdi-minus',
  value: '-',
  color: 'secondary',
  size: 'small',
})
</script>

<template>
  <div>
    <VChip
      :size="size"
      :color="color"
      variant="elevated"
    >
      <VIcon
        :icon="icon"
        size="14"
      />
      <span v-if="!onlyIcon" class="ml-1">{{ value }}</span>
    </VChip>
    <VTooltip
      v-if="tooltip || onlyIcon"
      activator="parent"
      location="top"
    >
      {{ tooltip }}<strong v-if="onlyIcon">: {{ value }}</strong>
    </VTooltip>
  </div>
</template>

<style scoped>

</style>
