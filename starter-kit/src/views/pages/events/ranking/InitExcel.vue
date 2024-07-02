<script setup lang="ts">
import { useTheme } from 'vuetify'
import * as illustrations from '@core/utils/illustrations'

const vuetifyTheme = useTheme()
</script>

<template>
  <VCard
    class="d-flex flex-column justify-center align-center mx-auto"
    style="max-width: 700px"
  >
    <div class="d-lg-flex px-10 pt-3 pb-0 align-center">
      <div class="pr-5">
        {{ $t('ThereAreNoRankingForThisMoment') }}
      </div>
      <div v-html="illustrations.excelDraft(vuetifyTheme.current.value.colors.primary, '200px')" />
    </div>
  </VCard>
</template>

<style scoped>

</style>
