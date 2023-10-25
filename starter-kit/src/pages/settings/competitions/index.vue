<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { Ref } from 'vue/dist/vue'
import axiosIns from '@axios'

import SettingsCompetitionForm from '@/views/forms/SettingsCompetitionForm.vue'
import SettingsGroupForm from '@/views/forms/SettingsGroupForm.vue'
import type { Competition, Group } from '@/globals/types/types'
import { defaultCompetition, defaultGroup } from '@/globals/defaults'

const competitions: Ref<Array<Competition>> = ref([])
const groups: Ref<Array<Group>> = ref([])

const totalItems = ref(0)
const page = ref(1)
const perPage = ref(10)

const competitionHeaders = ref([
  { title: 'ID', key: 'id', sortable: false },
  { title: 'GROUP', key: 'group', sortable: false },
  { title: 'NAME', key: 'name', sortable: false },
  { title: 'DESCRIPTION', key: 'description', sortable: false },
  { title: 'ACTION', key: 'action', sortable: false },
])

const loading = ref(false)

const isEditGroupDialogVisible: Ref<boolean> = ref(false)
const isEditCompetitionDialogVisible: Ref<boolean> = ref(false)

const editedGroup: Ref<Group> = ref({ ...defaultGroup })
const editedCompetition: Ref<Competition> = ref({ ...defaultCompetition })

const reloadData = async () => {
  loading.value = true

  const params = {
    limit: perPage.value,
    page: page.value,
  }

  const { data: competitionData } = await axiosIns.get('/settings/competitions', { params })
  const { data: groupData } = await axiosIns.get('/settings/groups', { params })

  competitions.value = competitionData?.items?.map((competition: Competition) => ({ ...competition })) || []
  groups.value = groupData?.items?.map((group: Group) => ({ ...group, menu: false })) || []

  totalItems.value = competitionData?.totalItems || 0

  loading.value = false
}

const openEditCompetition = (competition: Competition): void => {
  if (!competition)
    editedCompetition.value = { ...defaultCompetition }
  else
    editedCompetition.value = { ...competition }

  isEditCompetitionDialogVisible.value = true
}

const openEditGroup = (group: Group): void => {
  if (!group)
    editedGroup.value = { ...defaultGroup }
  else
    editedGroup.value = { ...group }

  isEditGroupDialogVisible.value = true
}

const closeCompetitionModal = (competition: Competition): void => {
  isEditCompetitionDialogVisible.value = false
  if (!competition)
    return

  reloadData()
}

const closeGroupModal = (group: Group): void => {
  isEditGroupDialogVisible.value = false

  if (!group)
    return

  reloadData()
}

const deleteGroup = (group: Group, index: number): void => {
  const { id } = group
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h4>
        {{ $t('Groups') }}
        <VBtn
          color="primary"
          size="small"
          class="me-1"
          @click="openEditGroup(null)"
        >
          <VIcon
            icon="mdi-plus"
            size="20"
          />
        </VBtn>
      </h4>

      <VCard class="mt-2 pa-2">
        <VMenu
          v-for="(group, groupIndex) in groups"
          :key="`group_${group.id}`"
          v-model="group.menu"
          :close-on-content-click="false"
          location="right center"
          open-on-hover
        >
          <template #activator="{ props }">
            <VChip
              v-bind="props"
              color="primary"
              class="mr-1"
            >
              {{ group.name }}
            </VChip>
          </template>

          <VCard class="pa-2 ma-1">
            <VBtn
              icon
              size="small"
              color="secondary"
              variant="text"
              class="mr-2"
              @click="deleteGroup(group, groupIndex)"
            >
              <VIcon icon="mdi-trash" />
            </VBtn>
            <VBtn
              icon
              size="small"
              color="secondary"
              variant="text"
              @click="openEditGroup(group)"
            >
              <VIcon icon="mdi-edit" />
            </VBtn>
          </VCard>
        </VMenu>
      </VCard>
    </div>
    <h4>
      {{ $t('Competitions') }}
      <VBtn
        color="primary"
        size="small"
        class="me-1"
        @click="openEditCompetition(null)"
      >
        <VIcon
          icon="mdi-plus"
          size="20"
        />
      </VBtn>
    </h4>
    <VCard>
      <VDataTableServer
        v-model:items-per-page.async="perPage"
        v-model:page.async="page"
        :must-sort="false"
        :headers="competitionHeaders"
        :items="competitions"
        :items-length="totalItems"
        :loading="loading"
        @update:options="reloadData"
      >
        <template #item.description="{ item }">
          {{ $filters.truncate(item.raw.description, 60) }}
        </template>

        <template #item.group="{ item }">
          <VChip
            v-if="item.raw.group"
            color="primary"
          >
            {{ item.raw.group.name }}
          </VChip>
          <VIcon
            v-else
            icon="mdi-minus"
          />
        </template>

        <template #item.action="{ item }">
          <VBtn
            size="sm"
            variant="plain"
            color="warning"
            @click="editedCompetition = item.raw; isEditCompetitionDialogVisible = true"
          >
            <VIcon icon="mdi-edit" />
          </VBtn>
          <VBtn
            size="sm"
            class="ml-5"
            variant="plain"
            color="error"
            @click="editedCompetition = item.raw; isEditCompetitionDialogVisible = true"
          >
            <VIcon icon="mdi-trash" />
          </VBtn>
        </template>
      </VDataTableServer>
    </VCard>

    <VDialog
      v-model="isEditCompetitionDialogVisible"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <SettingsCompetitionForm
          v-if="isEditCompetitionDialogVisible"
          ref="competitionFormRef"
          :default-competition="editedCompetition"
          :groups="groups"
          @close="closeCompetitionModal"
        />
      </VCard>
    </VDialog>

    <!-- Group Dialog -->
    <VDialog
      v-model="isEditGroupDialogVisible"
      transition="dialog-bottom-transition"
      width="500"
    >
      <!-- Dialog Content -->
      <VCard>
        <SettingsGroupForm
          v-if="isEditGroupDialogVisible"
          ref="groupFormRef"
          :default-group="editedGroup"
          @close="closeGroupModal"
        />
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>

</style>
