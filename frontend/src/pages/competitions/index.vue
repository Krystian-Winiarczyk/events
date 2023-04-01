<script lang="ts" setup>
import { onMounted } from 'vue'
import TableWrapper from '@/views/utils/table-wrapper.vue'
import TableContent from '@/views/utils/table-content.vue'
import EmptyContent from '@/views/utils/empty-content.vue'
import LoadingSpinner from '@/views/utils/loading-spinner.vue'
import { useCompetitions } from '@/composable/useCompetitions'

const { load, loading, items } = useCompetitions()

const tableHeaders = reactive([
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone', key: 'phone' },
  { label: 'Email', key: 'email' },
  { label: 'Status', key: 'status' },
])

onMounted(() => {
  load()
})
</script>

<template>
  <div>
    <VBtn
      color="primary"
      class="mb-2"
      size="small"
      to="competitions/new"
    >
      <VIcon
        size="22"
        icon="tabler-plus"
      />
      {{ $t('Add') }}
    </VBtn>
    <VCard>
      <VCardItem>
        <TableWrapper
          class="py-2"
          :show-search="false"
          :show-per-page="false"
          :show-reload="false"
        >
          <template #table>
            <LoadingSpinner v-if="loading" />
            <EmptyContent v-else-if="!items.length" />
            <TableContent
              v-else
              :headers="tableHeaders"
              :items="items"
            >
              <template #cell(status)="{ value }">
                <VChip>{{ value.name }}</VChip>
              </template>
            </TableContent>
          </template>
        </TableWrapper>
      </VCardItem>
    </VCard>
  </div>
</template>
