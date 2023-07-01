<script setup lang="ts">
import { useAuthStore } from '@/stores/root/Auth'

const auth = useAuthStore()
const user = auth.user
</script>

<template>
  <div
    class="
      d-flex flex-column flex-1-0 margin-center

      flex-md-0-0
    "

    :style="isSM ? 'row-gap: 2rem' : 'row-gap: 1rem'"
  >
    <Header :user="user" />

    <Settings :user="user" />
  </div>
</template>
