<script setup lang="ts">
import UserDetails from '@/views/pages/profile/UserDetails.vue'
import { useAuthStore } from '@/store/auth'

const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <UserDetails :user.async="user" />
</template>

<style scoped>

</style>
