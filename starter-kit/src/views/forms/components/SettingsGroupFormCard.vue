<script setup lang="ts">
import type { Group } from '@/globals/types/types'
import { requiredValidator } from '@validators'

interface Props {
  group: Group
  showDelete: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['removeItem'])
</script>

<template>
  <div class="d-flex">
    <!-- Data -->
    <div class="flex-grow-1 mr-5">
      <VTextField
        v-model="group.name"
        density="compact"
        :rules="[requiredValidator]"
        :label="$t('Name')"
      />
    </div>
    <VBtn
      v-if="showDelete"
      size="sm"
      color="error"
      variant="plain"
      @click="emits('removeItem')"
    >
      <VIcon
        icon="mdi-trash"
        size="25"
      />
    </VBtn>
  </div>
</template>

<style scoped>

</style>
