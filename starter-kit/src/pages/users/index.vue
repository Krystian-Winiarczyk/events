<script setup lang="ts">
import axiosIns from '@axios'

import { roleColor } from '@core/utils/colors'

import { VDataTableServer } from 'vuetify/labs/VDataTable'

const users = ref([])
const totalItems = ref(0)
const page = ref(1)
const perPage = ref(10)

const usersHeaders = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'NAME', key: 'name', sortable: false },
  { title: 'EMAIL', key: 'email', sortable: false },
  { title: 'PROFILES', key: 'profilesCount', sortable: false },
  { title: 'PETS', key: 'petsCount', sortable: false },
  { title: 'ROLE', key: 'role', sortable: false },
])

const loading = ref(false)

const reloadData = async () => {
  loading.value = true

  const params = {
    limit: perPage.value,
    page: page.value,
  }

  const { data } = await axiosIns.get('/users', { params })

  users.value = data?.items?.map(user => ({
    ...user,
    petsCount: user?.pets?.length || 0,
    profilesCount: user?.profiles?.length || 0,
  })) || []
  totalItems.value = data?.totalItems || 0

  loading.value = false
}
</script>

<template>
  <div>
    <h4>Users</h4>
    <VDataTableServer
      v-model:items-per-page.async="perPage"
      v-model:page.async="page"
      :must-sort="false"
      :headers="usersHeaders"
      :items="users"
      :items-length="totalItems"
      :loading="loading"
      @update:options="reloadData"
    >
      <template #item.name="{ item }">
        <Text :value="item.raw.name" :to="`/users/${item.raw.id}`" />
      </template>
      <template #item.profilesCount="{ item }">
        <VChip color="primary">
          {{ $t('Profile', 2) }}:
          <span class="font-weight-bold pl-1">{{ item.columns.profilesCount }}</span>
        </VChip>
      </template>
      <template #item.petsCount="{ item }">
        <VChip color="primary">
          {{ $t('Pet', 2) }}:
          <span class="font-weight-bold pl-1">{{ item.columns.petsCount }}</span>
        </VChip>
      </template>
      <template #item.role="{ item }">
        <VChip :color="roleColor(item.columns.role)">
          {{ item.columns.role }}
        </VChip>
      </template>
    </VDataTableServer>
  </div>
</template>

<style scoped>

</style>
