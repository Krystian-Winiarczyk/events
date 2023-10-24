<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  title: string
  text: string
  to: RouteLocationRaw | string
  image: string
  totalCount: number
}

const props = withDefaults(defineProps<Props>(), {
  totalCount: 0,
})

const router = useRouter()
</script>

<template>
  <VCard @click="router.push(to)">
    <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
      <div class="py-4 px-6 text-center mx-auto" v-html="image"></div>
      <div>
        <VCardItem>
          <VCardTitle>
            {{ title }}
          </VCardTitle>

          {{ text }}
        </VCardItem>
        <VCardItem class="mt-n4">
          <div class="d-flex justify-content-center w-100">
            <div class="flex-grow-1 text-center">
                <span class="text-primary">{{ $t('CreatedRecords') }}</span>
                <div class="text-center font-weight-bold">{{ totalCount }}</div>
            </div>

            <div class="flex-grow-1 text-center">
                <span class="text-primary">{{ $t('ActiveRecords') }}</span>
                <div class="text-center font-weight-bold">{{ totalCount }}</div>
            </div>
          </div>
        </VCardItem>
      </div>
    </div>
  </VCard>
</template>

<style scoped>

</style>
