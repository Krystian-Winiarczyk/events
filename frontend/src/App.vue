<script setup lang="ts">
import { useSnackbar } from '@composable/useSnackbar';
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl } = useThemeConfig()

const { global } = useTheme()
const { errors, successes } = useSnackbar()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
    </VApp>

    <VSnackbar color="danger" v-model="error.visible" v-for="(error, index) in errors" :key="`errors_${index}`">
      {{ error.message ? $t(error.message) : error.message }}
    </VSnackbar>

    <VSnackbar color="success" v-model="success.visible" v-for="(success, index) in successes" :key="`successes_${index}`">
      {{ success.message ? $t(success.message) : success.message }}
    </VSnackbar>
  </VLocaleProvider>
</template>
