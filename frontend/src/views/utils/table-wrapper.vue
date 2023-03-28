<script setup lang="ts">
// 👉 props
const props = defineProps({
  tag: { default: 'VCard', required: false, type: String },

  showReload: { default: true, type: Boolean },

  showSearch: { default: true, type: Boolean },
  search: { default: '', type: String },

  showPerPage: { default: true, type: Boolean },
  page: { default: 1, type: Number },
  perPage: { default: 25, type: Number },
  totalItems: { default: 0, type: Number },
})

// 👉 emits
const emits = defineEmits([
  'updateVisibleColumns',
  'loadData',
])

// 👉 Computing pagination data
const items = ref([])

// 👉 pagination data
const perPageItems = [25, 50, 100, 250]

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = items.value.length ? ((props.page - 1) * props.perPage) + 1 : 0
  const lastIndex = items.value.length + ((props.page - 1) * props.perPage)

  return `Showing ${firstIndex} to ${lastIndex} of ${props.totalItems} entries`
})

const refreshData = () => {
  emits('loadData')
}
</script>

<template>
  <div>
    <!-- Pagination per page, search bar, columns shows definition -->
    <VRow>
      <!-- Reload data button -->
      <VCol cols="1" v-if="showReload">
        <VBtn
          color="primary"
          @click="refreshData"
        >
          <v-icon icon="mdi-reload"></v-icon>
        </VBtn>
      </VCol>
      <!-- Per page -->
      <VCol cols="2" v-if="showPerPage">
        <VSelect
          :model-value="props.perPage"
          :items="perPageItems"
          label="Per page"
        />
      </VCol>
      <!-- Search bar -->
      <VCol
        v-if="props.showSearch"
        cols="9"
      >
        <VTextField
          variant="underlined"
          label="Type to search"
          :model-value="props.search"
        />
      </VCol>
    </VRow>

    <!-- Table view slot -->
    <slot name="table" />

    <VDivider />

    <!-- Pagination page and total records -->
    <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VPagination
        :model-value="props.page"
        size="small"
        :total-visible="5"
        :length="props.totalItems"
      />
    </VCardText>
  </div>
</template>
