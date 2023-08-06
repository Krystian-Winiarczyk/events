<script setup lang="ts">
import { themeConfig } from '@themeConfig'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import NavBarI18n from '@/layouts/components/NavBarI18n.vue'
</script>

<template>
  <div class="w-100 d-flex align-center justify-space-between">
    <RouterLink
      to="/"
      class="d-flex align-start gap-x-2"
    >
      <VNodeRenderer
        :nodes="themeConfig.app.logo"
        style="max-height: 75px"
      />
    </RouterLink>

    <VSpacer />

    <div>
      <NavBarI18n />

      <VBtn
        class="ml-5"
        :to="{ name: 'login' }"
      >
        Panel zawodnika
      </VBtn>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
