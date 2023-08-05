<script setup lang="ts">
import type { Ref } from 'vue'
import BioPanel from '@/views/pages/profile/BioPanel.vue'
import PetsTab from '@/views/pages/profile/PetsTab.vue'
import type { User, UserPet, UserProfile } from '@/globals/types/types'
import { defaultPet, defaultProfile } from '@/globals/defaults'
import PetForm from '@/views/forms/PetForm.vue'
import ProfilesTab from '@/views/pages/profile/ProfilesTab.vue'
import ProfileForm from '@/views/forms/ProfileForm.vue'
import SecurityTab from '@/views/pages/profile/SecurityTab.vue'

interface Props {
  user: User | null
  enableEdit?: boolean
  openedTab?: number
  selectedPet?: UserPet | null
  selectedProfile?: UserProfile | null
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  enableEdit: true,
  openedTab: 0,
  selectedPet: null,
  selectedProfile: null,
})

const userTab = ref(0)
const petFormRef = ref()

const tabsDef = [
  { icon: 'mdi-paw', title: 'Pet' },
  { icon: 'mdi-users', title: 'Profile' },
  { icon: 'mdi-settings', title: 'Account', requiredEdit: true },
]

const tabs = computed(() => {
  return tabsDef.filter(tab => !tab?.requiredEdit || (tab?.requiredEdit && props.enableEdit))
})

const getUserPets = computed((): UserPet[] => {
  return props.user.pets ?? []
})

const getUserProfiles = computed((): UserProfile[] => {
  return props.user.profiles ?? []
})

// Edit pet
const isEditPetDialogVisible: Ref<boolean> = ref(false)
const isEditProfileDialogVisible: Ref<boolean> = ref(false)
const editedPet: Ref<UserPet> = ref({ ...defaultPet })
const editedProfile: Ref<UserProfile> = ref({ ...defaultProfile })

const openEditPet = (pet: UserPet): void => {
  if (!pet)
    editedPet.value = { ...defaultPet }
  else
    editedPet.value = { ...pet }

  isEditPetDialogVisible.value = true
}

const openEditProfile = (profile: UserProfile): void => {
  if (!profile)
    editedProfile.value = { ...defaultProfile }
  else
    editedProfile.value = { ...profile }

  isEditProfileDialogVisible.value = true
}

const closePetModal = (userPet: UserPet): void => {
  isEditPetDialogVisible.value = false
  if (!userPet)
    return

  const petIndex = props.user.pets.findIndex((pet: UserPet) => pet.id === userPet.id)

  if (petIndex > -1)
    props.user.pets[petIndex] = userPet
  else
    props.user.pets.push({ ...userPet })
}

const closeProfileModal = (userProfile: UserProfile): void => {
  isEditProfileDialogVisible.value = false
  if (!userProfile)
    return

  const profileIndex = props.user.profiles.findIndex((profile: UserProfile) => profile.id === userProfile.id)

  if (userProfile.isPrimary)
    props.user.primaryProfile = userProfile

  if (profileIndex > -1)
    props.user.profiles[profileIndex] = userProfile
  else
    props.user.profiles.push({ ...userProfile })
}

onMounted(() => {
  if (props.openedTab)
    userTab.value = props.openedTab
})
</script>

<template>
  <VRow v-if="user">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      {{ userTab }}
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
            :enable-edit="enableEdit"
            :selected-item="selectedPet"
            @open-edit="openEditPet"
          />
        </VWindowItem>

        <VWindowItem>
          <ProfilesTab
            :profiles="getUserProfiles"
            :enable-edit="enableEdit"
            :selected-item="selectedProfile"
            @open-edit="openEditProfile"
          />
        </VWindowItem>

        <VWindowItem>
          <SecurityTab :user="user" />
        </VWindowItem>
      </VWindow>
    </VCol>

    <!-- Pet Modal -->
    <VDialog
      v-if="enableEdit"
      v-model="isEditPetDialogVisible"
      fullscreen
      :scrim="false"
      :persistent="true"
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <PetForm
          v-if="isEditPetDialogVisible"
          ref="petFormRef"
          :default-pet="editedPet"
          @close="closePetModal"
        />
      </VCard>
    </VDialog>

    <VDialog
      v-if="enableEdit"
      v-model="isEditProfileDialogVisible"
      fullscreen
      :scrim="false"
      :persistent="true"
      transition="dialog-bottom-transition"
    >
      <!-- Dialog Content -->
      <VCard>
        <ProfileForm
          v-if="isEditProfileDialogVisible"
          ref="profileFormRef"
          :default-profile="editedProfile"
          @close="closeProfileModal"
        />
      </VCard>
    </VDialog>
  </VRow>
</template>

<style scoped>

</style>
