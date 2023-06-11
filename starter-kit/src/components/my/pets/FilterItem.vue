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
    class="w-100 d-flex flex-column justify-center align-center gap-2"
  >
    <span
      class="w-100 d-flex flex-column justify-center align-center rounded-lg"
      :style="`background: rgba(${color}, .34); padding: 1.1rem 0;`"
    >
      <VIcon
        :icon="icon"
        size="28"
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
