<template>
  <VList>
    <VListItem :to="{ name: 'settings-competitions' }">
      {{ $t('Competitions') }}
    </VListItem>
    <VListItem :to="{ name: 'settings-events' }">
      {{ $t('Events') }}
    </VListItem>
    <VListItem :to="{ name: 'settings-sponsors' }">
      {{ $t('Sponsors') }}
    </VListItem>
  </VList>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
