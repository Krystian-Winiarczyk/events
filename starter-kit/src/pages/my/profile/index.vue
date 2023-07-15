<script setup lang="ts">
import type { Ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import BioPanel from '@/views/pages/my/profile/BioPanel.vue'
import PetsTab from '@/views/pages/my/profile/PetsTab.vue'
import type { UserPet } from '@/globals/types/types'
import { defaultPet } from '@/globals/defaults'
import PetForm from '@/views/pages/forms/PetForm.vue'

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

// Edit pet
const isEditPetDialogVisible: Ref<boolean> = ref(false)
const editedPet: Ref<UserPet> = ref({ ...defaultPet })

const openEditPet = (pet: UserPet): void => {
  if (!pet)
    editedPet.value = { ...defaultPet }
  else
    editedPet.value = { ...pet }

  isEditPetDialogVisible.value = true
}
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
          <PetsTab
            :pets="getUserPets"
            @open-edit="openEditPet"
          />
        </VWindowItem>
      </VWindow>
    </VCol>

    <!-- Pet Modal -->
    <VDialog
      v-model="isEditPetDialogVisible"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <div>
          <VToolbar color="primary">
            <VBtn
              icon
              variant="plain"
              @click="isEditPetDialogVisible = false"
            >
              <VIcon
                color="white"
                icon="mdi-close"
              />
            </VBtn>

            <VToolbarTitle>Settings</VToolbarTitle>
          </VToolbar>
        </div>
        <VCardText>
          <PetForm
            v-if="isEditPetDialogVisible"
            :default-pet="editedPet"
            @close="isEditPetDialogVisible = false"
          />
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            @click="isEditPetDialogVisible = false"
          >
            Close
          </VBtn>
          <VBtn
            color="success"
            @click="isEditPetDialogVisible = false"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<style scoped>

</style>
