<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import BioPanel from '@/views/pages/my/profile/BioPanel.vue'
import PetsTab from '@/views/pages/my/profile/PetsTab.vue'
import type { UserPet } from '@/globals/types/types'

const { user } = storeToRefs(useAuthStore())

const userTab = ref('')

const tabs = [
  { icon: 'mdi-paw', title: 'Pet' },
  { icon: 'mdi-users', title: 'Profile' },
  { icon: 'mdi-lock-outline', title: 'Security' },
]

const getUserPets = computed((): UserPet[] => {
  return user.value.pets ?? []
})
</script>

<template>
  <VRow v-if="user">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <BioPanel :user-data="user" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs v-model="userTab">
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            start
            :size="24"
            :icon="tab.icon"
          />
          <span>{{ $t(tab.title, 2) }}</span>
        </VTab>
      </VTabs>
      <VDivider />

      <VWindow
        v-model="userTab"
        class="mt-2 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <PetsTab :pets="getUserPets" />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

<style scoped>

</style>
