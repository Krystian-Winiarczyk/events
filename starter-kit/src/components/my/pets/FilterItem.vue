<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },

  inputValue: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: false,
    default: '181,61,71',
  },
})

const emit = defineEmits([
  'update:modelValue',
])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    console.log(value)
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <input
    :id="`checkbox-${label}`"
    v-model="value"
    type="checkbox"
    :value="inputValue"
    :name="label"
    class="d-none filter-item"
  >

  <label
    :for="`checkbox-${label}`"
    class="d-flex flex-row justify-start align-center gap-2 bg-var-theme-background pa-2 rounded"
  >
    <span
      class="d-flex flex-column justify-center align-center rounded"
      :style="`background: rgba(${color}, .5); padding: .34rem;`"
    >
      <VIcon
        :icon="icon"
        size="20"
      />
    </span>

    {{ label }}
  </label>
</template>

<style lang="scss" scoped>
.filter-item ~ label {

  .icon-container {
  }
}
</style>
