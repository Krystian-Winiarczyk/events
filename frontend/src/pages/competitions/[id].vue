<script lang="ts" setup>
import Edit from '@/views/pages/competitions/edit.vue'
import Details from '@/views/pages/competitions/details.vue'
import axiosIns from '@/plugins/axios'
import { useCompetitions } from '@/composable/useCompetitions'
import { onMounted } from 'vue'

const route = useRoute()
const { loading, loadSingle, editOrCreate } = useCompetitions()

const editedItem = ref({
  name: '',
  description: '',
  regulationUrl: '',
  competitionLevels: [],
})

const isEditMode = ref(false)

const isNewMode = computed(() => {
  return route.params.id === 'new'
})

const isViewMode = computed(() => {
  return route.params.id !== 'new'
})

const save = async () => {
  const payload = { ...editedItem }

  try {
    const { competitionLevels, ...competition } = payload
    const competitionResponse = await editOrCreate(competition, false)

    if (competitionResponse?.id) {
      // TODO: Add competition Levels
    }
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  if (isViewMode) {
    const initResponse = await loadSingle(<string> route.params.id)
        console.log(initResponse);
        
    if (initResponse)
        editedItem.value = initResponse
  }
})
</script>

<template>
  <div>
    <div class="mb-2">
      <VBtn
        color="secondary"
        class="mr-2"
        size="small"
        to="/competitions"
      >
        <VIcon
          size="22"
          icon="tabler-arrow-back-up"
        />
        {{ $t('Back') }}
      </VBtn>
      <VBtn
        v-if="!isNewMode"
        variant="outlined"
        color="primary"
        size="small"
        class="mr-2"
        @click="isEditMode = !isEditMode"
      >
        <VIcon
          size="22"
          icon="tabler-eye"
        />
        {{ !isEditMode ? $t('Edit') : $t('Details') }}
      </VBtn>
      <VBtn
        v-if="!isViewMode || isEditMode"
        color="primary"
        size="small"
        class="mr-2"
        to="/competitions/new"
        @click="save"
      >
        <VIcon
          size="22"
          icon="tabler-device-floppy"
        />
        {{ $t('Save') }}
      </VBtn>
    </div>

    <!-- Content -->
    <Details
      v-if="isViewMode && !isEditMode"
      :item="editedItem"
    />
    <Edit
      v-else
      :item.async="editedItem"
    />
  </div>
</template>
