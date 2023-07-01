<script setup lang="ts">
import Header from '@/components/my/settings/profile/Header.vue'
import Settings from '@/components/my/settings/profile/Settings.vue'

import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

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
