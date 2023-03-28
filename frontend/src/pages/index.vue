<script lang="ts" setup>
import TableWrapper from '@/views/utils/table-wrapper.vue'
import TableContent from '@/views/utils/table-content.vue'
import EmptyContent from '@/views/utils/empty-content.vue'
import LoadingSpinner from '@/views/utils/loading-spinner.vue'

const items = ref([
  {
    firstName: '123',
    lastName: '123',
    phone: '123',
    email: '123',
    status: '123',
  },
])

const loading = ref(false)

const tableHeaders = reactive([
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone', key: 'phone' },
  { label: 'Email', key: 'email' },
  { label: 'Status', key: 'status' },
])
</script>

<template>
  <div>
    <VCard
      class="mb-6"
      title="Kick start your project 🚀"
    >
      <VCardText>All the best for your new project.</VCardText>
      <VCardText>
        Please make sure to read our <a
          href="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-decoration-none"
        >
          Template Documentation
        </a> to understand where to go from here and how to use our template.
      </VCardText>
    </VCard>

    <VCard
      title="Want to integrate JWT? 🔒"
      class="mb-6"
    >
      <VCardText>We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.</VCardText>
      <VCardText>Please read our  JWT Documentation to get more out of JWT authentication.</VCardText>
    </VCard>

    <VCard>
      <VCardItem>
        <TableWrapper class="py-2" :show-search="false" :show-per-page="false">
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
