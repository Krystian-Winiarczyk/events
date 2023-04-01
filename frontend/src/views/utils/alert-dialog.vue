<script setup lang="ts">
import { AlertDialogType } from '@types/AlertDialogType'

const props = defineProps({
  visible: { default: false, type: Boolean, required: true },
  okLabel: { default: 'Ok', type: String, required: false },
  cancelLabel: { default: 'Cancel', type: String, required: false },
  title: { default: '?', type: String, required: false },
  message: { default: '??', type: String, required: false },
  type: { default: AlertDialogType.SUCCESS, type: AlertDialogType, required: false },
})

const emits = defineEmits(['changeVisible', 'ok', 'cancel'])

const hideDialog = () => {
  emits('changeVisible', false)
}

const acceptDialog = () => {
  emits('ok')
}

const cancelDialog = () => {
  emits('cancel')
  emits('changeVisible', false)
}
</script>

<template>
  <VDialog
    :model-value="visible"
    persistent
    class="v-dialog-sm"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="hideDialog" />

    <!-- Dialog Content -->
    <VCard :title="$t(title)">
      <VCardText>
        {{ $t(message) }}
      </VCardText>

      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="cancelDialog"
        >
          {{ $t('cancelLabel') }}
        </VBtn>
        <VBtn
          @click="acceptDialog"
        >
          {{ $t('okLabel') }}
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

