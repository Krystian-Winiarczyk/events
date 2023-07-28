<script setup lang="ts">
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import authV1LoginMaskDark from '@images/pages/auth-v1-login-mask-dark.png'
import authV1LoginMaskLight from '@images/pages/auth-v1-login-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { requiredValidator } from '@validators'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const loginFormRef = ref()

const form = ref({
  email: 'admin@catchparty.eu',
  password: 'admin1234',
  remember: false,
})

const onSubmit = () => {
  loginFormRef.value?.validate().then(async (valid: { valid: any }) => {
    if (valid.valid) {
      await authStore.login(form.value.email, form.value.password)
    }
  })
}

const authV1ThemeLoginMask = useGenerateImageVariant(authV1LoginMaskLight, authV1LoginMaskDark)
const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div>
            <VNodeRenderer
              :nodes="themeConfig.app.logo"
              style="max-height: 100px"
            />
          </div>
        </template>
      </VCardItem>

      <VCardText class="px-8">
        <h5 class="text-h5 mb-1">
          Witaj w <span class="text-capitalize">{{ themeConfig.app.title }}! 👋🏻</span>
        </h5>

        <p class="mb-0">
          Zaloguj się do swojego konta i rozpocznij zabawę
        </p>
      </VCardText>

      <VCardText class="px-8">
        <VForm
          ref="loginFormRef"
          @submit.prevent="onSubmit"
        >
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                label="Email"
                type="email"
                placeholder="johndoe@email.com"
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Hasło"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <div />
                <RouterLink
                  class="text-primary ms-2 mb-1"
                  :to="{ name: 'index' }"
                >
                  Zapomniałeś hasła?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Zaloguj
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Jesteś nowy na platformie?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'signup' }"
              >
                Utwórz konto
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
    <VImg
      :src="authV1ThemeLoginMask"
      class="d-none d-md-block auth-footer-mask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
