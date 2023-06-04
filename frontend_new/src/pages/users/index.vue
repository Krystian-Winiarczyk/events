<script lang="ts" setup>
import { useUserStore } from '@/store/useUserStore'

const searchQuery = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)
const selectedRows = ref<string[]>([])
const selectAllUsers = ref(false)

const userStore = useUserStore()
const users = userStore.getData

// 👉 Fetch Invoices
watchEffect(() => {
  userStore.fetch()
})

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Add/Remove all checkbox ids in/from array
const selectUnselectAll = () => {
  selectAllUsers.value = !selectAllUsers.value
  if (selectAllUsers.value) {
    users.value.forEach(user => {
      if (!selectedRows.value.includes(`check${user.id}`))
        selectedRows.value.push(`check${user.id}`)
    })
  }
  else {
    selectedRows.value = []
  }
}

// 👉 watch if checkbox array is empty all checkbox should be uncheck
watch(selectedRows, () => {
  if (!selectedRows.value.length)
    selectAllUsers.value = false
}, { deep: true })

// 👉 Add/Remove individual checkbox in/from array
const addRemoveIndividualCheckbox = (checkID: string) => {
  if (selectedRows.value.includes(checkID)) {
    const index = selectedRows.value.indexOf(checkID)

    selectedRows.value.splice(index, 1)
  }
  else {
    selectedRows.value.push(checkID)
    selectAllUsers.value = true
  }
}
</script>

<template>
  <!-- SECTION Table -->
  <VTable class="text-no-wrap invoice-list-table">
    <!-- 👉 Table head -->
    <thead>
      <tr>
        <!-- 👉 Check/Uncheck all checkbox -->
        <th
          scope="col"
          class="text-center"
        >
          <div style="width: 1rem;">
            <VCheckbox
              :model-value="selectAllUsers"
              :indeterminate="(users.length !== selectedRows.length) && !!selectedRows.length"
              @click="selectUnselectAll"
            />
          </div>
        </th>

        <th scope="col">
          #ID
        </th>

        <th scope="col">
          Name
        </th>

        <th scope="col">
          Username
        </th>

        <th scope="col">
          Website
        </th>
      </tr>
    </thead>

    <!-- 👉 Table Body -->
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
      >
        <!-- 👉 Individual checkbox -->
        <td>
          <div style="width: 1rem;">
            <VCheckbox
              :id="`check${user.id}`"
              :model-value="selectedRows.includes(`check${user.id}`)"
              @click="addRemoveIndividualCheckbox(`check${user.id}`)"
            />
          </div>
        </td>

        <!-- 👉 Id -->
        <td>
          #{{ user.id }}
        </td>

        <!-- 👉 Name -->
        <td>
          {{ user.name }}
        </td>

        <!-- 👉 Username -->
        <td>
          {{ user.username }}
        </td>

        <!-- 👉 Website -->
        <td>
          {{ user.website }}
        </td>
      </tr>
    </tbody>

    <!-- 👉 table footer  -->
    <tfoot v-show="!users.length">
      <tr>
        <td
          colspan="8"
          class="text-center text-body-1"
        >
          No data available
        </td>
      </tr>
    </tfoot>
  </VTable>
  <!-- SECTION Table -->
  <VPagination
    v-model="currentPage"
    size="small"
    :total-visible="1"
    :length="totalPage"
    @next="selectedRows = []"
    @prev="selectedRows = []"
  />
</template>

<style scoped>

</style>
