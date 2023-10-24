<script lang="ts" setup>
import { useTheme } from 'vuetify'
import * as illustration from '@core/utils/illustrations'
import SettingsItemCard from '@/views/pages/settings/SettingsItemCard.vue'

const vuetifyTheme = useTheme()
</script>

<template>
  <VRow>
    <VCol md="6">
      <SettingsItemCard
        :title="$t('Sponsors')"
        :image="illustration.deal(vuetifyTheme.current.value.colors.primary)"
        :text="$t('SponsorsSettingsDescription')"
        :to="{ name: 'settings-sponsors' }"
      />
    </VCol>
    <VCol md="6">
      <SettingsItemCard
        :title="$t('Competitions')"
        :image="illustration.competition(vuetifyTheme.current.value.colors.primary)"
        :text="$t('CompetitionsSettingsDescription')"
        :to="{ name: 'settings-competitions' }"
      />
    </VCol>
    <VCol md="6">
      <SettingsItemCard
        :title="$t('Events')"
        :image="illustration.event(vuetifyTheme.current.value.colors.primary)"
        :text="$t('EventsSettingsDescription')"
        :to="{ name: 'settings-events' }"
      />
    </VCol>
  </VRow>
</template>

<style scoped>

</style>
