<script setup lang="ts">
import type { EventCompetition } from '@/globals/types/types'

interface Props {
  competition: EventCompetition
}

const props = defineProps<Props>()
</script>

<template>
  <VSwitch
    v-model="competition.active"
    inset
    class="bg-light-primary pa-2 rounded"
    color="primary"
    :label="competition.competition.name"
  />
  <VSlideXTransition mode="default">
    <VCard
      v-if="competition.active"
      class="pa-5"
    >
      <div class="d-flex">
        <div class="flex-grow-1 mr-3">
          <VTextField
            v-model="competition.userLimit"
            type="number"
            :label="$t('UserLimit')"
          />
        </div>
        <div class="flex-grow-1">
          <VTextField
            v-model="competition.pricePerStart"
            type="number"
            :label="$t('PricePerStart')"
          />
        </div>
      </div>
    </VCard>
  </VSlideXTransition>
</template>

<style scoped lang="scss">

</style>
