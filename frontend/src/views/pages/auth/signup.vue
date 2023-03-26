<script setup lang="ts">
import { useAuth } from '@composable/useAuth.ts'

const { login } = useAuth()

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nickname: '',
    password: '',
    confirmPassword: '',
})

const isPasswordVisible = ref(false)

const loginProcess = () => {
  login(form.value)
}
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="form.nickname"
          :label="$t('Nickname')"
          type="text"
        />
      </VCol>

      <!-- email -->
      <VCol cols="6">
        <VTextField
          v-model="form.firstName"
          :label="$t('FirstName')"
          type="text"
        />
      </VCol>

      <VCol cols="6">
        <VTextField
          v-model="form.lastName"
          :label="$t('LastName')"
          type="text"
        />
      </VCol>

      <VCol cols="6">
        <VTextField
          v-model="form.email"
          :label="$t('Email')"
          type="email"
        />
      </VCol>

      <VCol cols="6">
        <VTextField
          v-model="form.phone"
          :label="$t('Phone')"
          type="text"
        />
      </VCol>
      <!-- password -->
      <VCol cols="12">
        <VTextField
          v-model="form.password"
          :label="$t('Password')"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="
            isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
          "
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
        />

        <VTextField
          v-model="form.confirmPassword"
          class="mt-5"
          :label="$t('ConfirmPassword')"
          type="'password"
        />
        <!-- login button -->
        <VBtn
          class="mt-5"
          block
          @click="loginProcess"
        >
          Login
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
