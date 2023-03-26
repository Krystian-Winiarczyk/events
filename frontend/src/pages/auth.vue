<script setup lang="ts">
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import Login from '@/views/pages/auth/login.vue'
import Signup from '@/views/pages/auth/signup.vue'

const isLoginForm = ref(true)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg
        :src="authV1TopShape"
        class="auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card pa-4"
        max-width="500"
      >
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </template>

          <VCardTitle class="font-weight-bold text-h5 py-1">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-1">
          <h5 class="text-h5 font-weight-semibold mb-1">
            {{ $t("WelcomeTo") }} {{ themeConfig.app.title }}! 👋🏻
          </h5>
          <p class="mb-0">
            {{ $t("PleaseSignInToYourAccountAndStartTheAdventure") }}
          </p>
        </VCardText>

        <VCardText>
          <!-- 👉 Form -->
          <Login v-if="isLoginForm" />
          <Signup v-else />
          <!-- 👉 Form :: end -->
          <VRow>
            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>{{ isLoginForm ? $t('NewOnOurPlatform') : $t('AlreadyOnOurPlatform') }}?</span>
              <span
                class="text-primary ms-2 cursor-pointer"
                @click="isLoginForm = !isLoginForm"
              >
                {{ isLoginForm ? $t('CreateAnAccount') : $t('LoginToAnAccount') }}
              </span>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
