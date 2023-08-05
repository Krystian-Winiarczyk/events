<script lang="ts" setup>
import type { User } from '@/globals/types/types'
import { confirmedValidator, requiredValidator } from '@validators'

interface Props {
  user: User
}

const props = defineProps<Props>()

const isPasswordEdited = ref(false)

const changePasswordForm = ref({
  actualPassword: '',
  newPassword: '',
  repeatNewPassword: '',
})

const isDeleteStarted = ref(false)

const deleteProcess = () => {
  if (!isDeleteStarted.value)
    isDeleteStarted.value = true
  else
    isDeleteStarted.value = false
}
</script>

<template>
  <div>
    <VList
      v-if="props"
      lines="2"
      variant="plain"
      rounded
    >
      <VListItem
        :title="$t('Email')"
        :subtitle="user.email"
      >
        <template #prepend>
          <VIcon icon="mdi-email" />
        </template>
      </VListItem>

      <VDivider />

      <VListItem
        :title="$t('Password')"
        subtitle="***********"
      >
        <template #prepend>
          <VIcon icon="mdi-lock" />
        </template>

        <template #append>
          <VExpandXTransition>
            <VIcon
              v-if="isPasswordEdited"
              icon="mdi-close"
              @click="isPasswordEdited = false"
            />
          </VExpandXTransition>
          <VIcon
            :icon="!isPasswordEdited ? 'mdi-edit' : 'mdi-content-save'"
            @click="isPasswordEdited = !isPasswordEdited"
          />
        </template>
      </VListItem>

      <VScaleTransition>
        <VListItem
          v-if="isPasswordEdited"
          key="changePasswordBox"
        >
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="changePasswordForm.actualPassword"
                :rules="[requiredValidator]"
                :label="$t('ActualPassword')"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="changePasswordForm.newPassword"
                :rules="[requiredValidator]"
                :label="$t('NewPassword')"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="changePasswordForm.repeatNewPassword"
                :rules="[requiredValidator, confirmedValidator(changePasswordForm.repeatNewPassword, changePasswordForm.newPassword)]"
                :label="$t('RepeatNewPassword')"
              />
            </VCol>
          </VRow>
        </VListItem>
      </VScaleTransition>
    </VList>

    <VBtn
      :variant="isDeleteStarted ? 'elevated' : 'outlined'"
      block
      class="mt-2"
      color="danger"
      @click="deleteProcess"
    >
      <VIcon
        icon="mdi-trash"
        class="mr-1"
      />
      {{ $t(isDeleteStarted ? 'AcceptDeleteAccount' : 'DeleteAccount') }}
    </VBtn>
  </div>
</template>

<style scoped>

</style>
