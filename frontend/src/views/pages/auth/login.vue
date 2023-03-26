<script setup lang="ts">
import { useAuth } from '@composable/useAuth.ts'

const { login } = useAuth()

const form = ref({
  email: '',
  password: '',
})

const isPasswordVisible = ref(false)

const loginProcess = () => {
  login(form.value)
}
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- email -->
      <VCol cols="12">
        <VTextField
          v-model="form.email"
          :label="$t('Email')"
          type="email"
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
