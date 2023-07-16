<script>
/**
 * A wrapper component for VSnackbar which supports queueing functionality
 */
export default {
  name: 'VSnackbarQueue',
  props: {
    items: {
      type: Array,
      required: true,
    },
    timeout: {
      type: Number,
      default: 6000,
    },
  },
  // eslint-disable-next-line vue/component-api-style
  data: () => ({
    timeoutId: false,
  }),
  // eslint-disable-next-line vue/component-api-style
  watch: {
    items() {
      this.processItems()
    },
  },
  // eslint-disable-next-line vue/component-api-style
  methods: {
    processItems() {
      if (this.items && Array.isArray(this.items) && this.items.length > 0) {
        const item = this.items[0]

        return this.timeoutId = setTimeout(() => {
          this.removeItem(item.id)
        }, this.timeout)
      }
    },
    removeItem(id) {
      clearTimeout(this.timeoutId)

      this.$emit('remove', id)

      if (this.items.length > 0)
        return this.processItems()
    },
  },
}
</script>

<template>
  <div>
    <VSnackbar
      v-for="(item, i) in items"
      :key="item.id"
      location="top"
      :color="item.color"
      :timeout="timeout"
      :model-value="i === 0"
    >
      <div class="d-flex">
        <VAvatar
          class="mr-5"
          variant="elevated"
          :icon="item.color === 'success' ? 'mdi-check' : 'mdi-close'"
        />
        <div>
          <h3>{{ $t(item.title) }}</h3>
          {{ $t(item.message) }}
        </div>
      </div>
      <template #actions>
        <VBtn
          v-if="items.length > 1"
          color="white"
          @click="removeItem(item.id)"
        >
          {{ $t('Next') }} ({{ items.length - 1 }} {{ $t('More') }})
        </VBtn>
        <VBtn
          v-else
          color="white"
          icon
          @click="removeItem(item.id)"
        >
          <VIcon icon="mdi-close" />
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>
