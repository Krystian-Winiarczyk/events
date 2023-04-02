<script setup lang="ts">
import { AlertDialogType } from '@types/AlertDialogType';

interface Props {
  visible: boolean
  callbackData: any
  okHide?: boolean
  cancelHide?: boolean
  okLabel?: string
  cancelLabel?: string
  title?: string
  message?: string
  type?: AlertDialogType
}

// Props
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  message: 'YouWillNotBeAbleToUndoIt',
  title: 'AreYouSure',
  cancelLabel: 'Cancel',
  okLabel: 'Confirm',
  okHide: false,
  cancelHide: false,
  type: AlertDialogType.PRIMARY,
})

// Data
const dialogVariants = {
  [AlertDialogType.SUCCESS]: {
    icon: 'tabler-check',
    color: 'success',
  },
  [AlertDialogType.DANGER]: {
    icon: 'tabler-alert-circle',
    color: 'error',
  },
  [AlertDialogType.INFO]: {
    icon: 'tabler-question-mark',
    color: 'info',
  },
  [AlertDialogType.PRIMARY]: {
    icon: 'tabler-user',
    color: 'primary',
  },
  [AlertDialogType.WARNING]: {
    icon: 'tabler-alert-triangle',
    color: 'warning',
  },
}

// Emits
const emits = defineEmits(['changeVisible', 'ok', 'cancel'])

// Methods
const hideDialog = () => {
  emits('changeVisible', false)
}

const acceptDialog = () => {
  emits('ok', props.callbackData)
}

const cancelDialog = () => {
  emits('cancel')
  emits('changeVisible', false)
}

// Dialog type
const dialogTypeIcon = computed(() => {
  return dialogVariants[props.type].icon
})

const dialogTypeColor = computed(() => {
  return dialogVariants[props.type].color
})
</script>

<template>
  <span>
    <VDialog
      :model-value="visible"
      class="v-dialog-sm"
    >
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="hideDialog" />

      <!-- Dialog Content -->
      <VCard>
        <VCardText class="d-flex align-center flex-column">
          <VIcon size="100" :color="dialogTypeColor" :icon="dialogTypeIcon" />
          <h2>{{ $t(title) }}</h2>
          <div>
            {{ $t(message) }}
          </div>
        </VCardText>

        <VCardText class="d-flex justify-center gap-3 flex-wrap">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="cancelDialog"
          >
            {{ $t(cancelLabel) }}
          </VBtn>
          <VBtn
            :color="dialogTypeColor"
            @click="acceptDialog"
          >
            {{ $t(okLabel) }}
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </span>
</template>

