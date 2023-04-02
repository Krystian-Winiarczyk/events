<script lang="ts" setup>
import Edit from '@/views/pages/competitions/edit.vue'
import Details from '@/views/pages/competitions/details.vue'
import AlertDialog from '@/views/utils/alert-dialog.vue'
import axiosIns from '@/plugins/axios'
import { useCompetitions } from '@/composable/useCompetitions'
import { onMounted } from 'vue'
import { AlertDialogType } from '@types/AlertDialogType';

const route = useRoute()
const { loading: competitionLoading, loadSingle, editOrCreate } = useCompetitions()

const dialogData = ref(null)
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

const remove = async (level: any, index: number) => {
  dialogData.value = { level, index }
    
}

const removeProcess = async (callbackData: any) => {
  const { level, index } = callbackData
  if (level?.id) {
      editedItem.value.competitionLevels.splice(index, 1)
  } 
}

onMounted(async () => {
  if (isViewMode) {
    const initResponse = await loadSingle(<string> route.params.id)
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

    <AlertDialog 
      :visible="!!dialogData"
      :callbackData="dialogData"
      :type="AlertDialogType.DANGER"
      @ok="removeProcess"
      @change-visible="dialogData = null" 
    />

    <!-- Content -->
    <Details
      v-if="isViewMode && !isEditMode"
      :item="editedItem"
      @remove-level-item="remove"
    />
    <Edit
      v-else
      :item.async="editedItem"
      @remove-level-item="remove"
    />
  </div>
</template>
