<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import axiosIns from '@axios'

import { genderIcon } from '@core/utils/icons'
import SocialMediaList from "@/views/SocialMediaList.vue";

const pets = ref([])
const totalItems = ref(0)
const page = ref(1)
const perPage = ref(10)

const petsHeaders = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'NAME', key: 'name', sortable: false },
  { title: 'OWNER', key: 'user', sortable: false },
  { title: 'SOCIAL MEDIA', key: 'medias', sortable: false },
  { title: 'WEIGHT', key: 'weight', sortable: false },
  { title: 'HEIGHT', key: 'height', sortable: false },
  { title: 'BREED', key: 'breed', sortable: false },
  { title: 'COLOR', key: 'color', sortable: false },
  { title: 'GENDER', key: 'gender', sortable: false },
])

const loading = ref(false)

const reloadData = async () => {
  loading.value = true

  const params = {
    limit: perPage.value,
    page: page.value,
  }

  const { data } = await axiosIns.get('/user/pets', { params })

  pets.value = data?.items?.map(pet => ({
    ...pet,
  })) || []
  totalItems.value = data?.totalItems || 0

  loading.value = false
}
</script>

<template>
  <div>
    <h4>Pets</h4>
    <VDataTableServer
      v-model:items-per-page.async="perPage"
      v-model:page.async="page"
      :must-sort="false"
      :headers="petsHeaders"
      :items="pets"
      :items-length="totalItems"
      :loading="loading"
      @update:options="reloadData"
    >
      <template #item.weight="{ item }">
        <Text
          :value="item.raw.weight"
          prefix="KG"
        />
      </template>
      <template #item.height="{ item }">
        <Text
          :value="item.raw.height"
          prefix="CM"
        />
      </template>
      <template #item.breed="{ item }">
        <Text :value="item.raw.breed" />
      </template>
      <template #item.color="{ item }">
        <Text :value="item.raw.color" />
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

      <template #item.name="{ item }">
        <div class="d-flex align-center py-1">
          <Avatar
            :item="item.raw"
            :size="40"
            class="mr-3"
          />
          <span>
            <div><Text :value="item.raw.name" :to="`/users/${item.raw.user.id}/pets/${item.raw.id}`" /></div>
            <small><VIcon
              icon="mdi-book"
              size="16"
            />{{ item.raw.passportNumber }}</small>
          </span>
        </div>
      </template>
    </VDataTableServer>
  </div>
</template>

<style scoped>

</style>
