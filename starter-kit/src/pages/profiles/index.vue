<script setup lang="ts">
import axiosIns from '@axios'

import { genderIcon } from '@core/utils/icons'
import { formatDate } from '@core/utils/formatters'

import { VDataTableServer } from 'vuetify/labs/VDataTable'
import SocialMediaList from '@/views/SocialMediaList.vue'

const profiles = ref([])
const totalItems = ref(0)
const page = ref(1)
const perPage = ref(10)

const profilesHeaders = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'NAME', key: 'name', sortable: false },
  { title: 'OWNER', key: 'user', sortable: false },
  { title: 'CREATED AT', key: 'createAt', sortable: false },
  { title: 'SOCIAL MEDIA', key: 'medias', sortable: false },
  { title: 'PRIMARY', key: 'isPrimary', sortable: false },
  { title: 'GENDER', key: 'gender', sortable: false },
])

const loading = ref(false)

const reloadData = async () => {
  loading.value = true

  const params = {
    limit: perPage.value,
    page: page.value,
  }

  const { data } = await axiosIns.get('/user/profiles', { params })

  profiles.value = data?.items?.map(profile => ({
    ...profile,
  })) || []
  totalItems.value = data?.totalItems || 0

  loading.value = false
}
</script>

<template>
  <div>
    <h4>{{ $t('Profile', 2) }}</h4>
    <VDataTableServer

      v-model:items-per-page.async="perPage"
      v-model:page.async="page"
      :must-sort="false"
      :headers="profilesHeaders"
      :items="profiles"
      :items-length="totalItems"
      :loading="loading"
      @update:options="reloadData"
    >
      <template #item.email="{ item }">
        {{ item.raw.user.email }}
      </template>
      <template #item.createAt="{ item }">
        {{ formatDate(item.raw.createAt) }}
      </template>
      <template #item.user="{ item }">
        <div
          v-if="item.raw.user"
          class="d-flex align-center"
        >
          <Avatar
            :item="item.raw.user"
            class="mr-3"
            :size="35"
          />
          {{ item.raw.user.name }}
        </div>
        <VIcon
          v-else
          icon="mdi-minus"
        />
      </template>
      <template #item.isPrimary="{ item }">
        <VChip :color="item.raw.isPrimary ? 'success' : 'error'">
          <VIcon :icon="item.raw.isPrimary ? 'mdi-check' : 'mdi-close'" />
        </VChip>
      </template>
      <template #item.gender="{ item }">
        <VIcon v-if="item.raw.gender" :icon="genderIcon(item.raw.gender)" />
        <VIcon
          v-else
          icon="mdi-minus"
        />
      </template>
      <template #item.medias="{ item }">
        <SocialMediaList
          justify="justify-start"
          :size="30"
          color="primary"
          :item="item.raw"
        />
      </template>
      <template #item.name="{ item }">
        <div class="d-flex align-center py-1">
          <Avatar
            :item="item.raw"
            :size="40"
            class="mr-3"
          />
          <span>
            <div><Text :value="item.raw.name" :to="`/users/${item.raw.user.id}/profiles/${item.raw.id}`" /></div>
            <small>@{{ item.raw.nickname }}</small>
          </span>
        </div>
      </template>
    </VDataTableServer>
  </div>
</template>

<style scoped>

</style>
