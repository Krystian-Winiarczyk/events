<script lang="ts" setup>
import axiosIns from '@axios'
import UserDetails from '@/views/pages/profile/UserDetails.vue'
import {UserPet, UserProfile} from "@/globals/types/types";

const loading = ref(false)
const user = ref(null)

const openedTab = ref(0)
const displayErrorPage = ref(false)
const selectedPet = ref(null)
const selectedProfile = ref(null)

const route = useRoute()

const processTabSelection = async (): Promise<void> => {
  if (!route.params?.all)
    return

  const [tab, itemId, ...other] = String(route.params.all).split('/')

  if (!tab)
    return
  if (other.length) {
    displayErrorPage.value = true

    return
  }

  if (tab === 'pets') {
    openedTab.value = 0
    if (!itemId)
      return

    const selectedItem = user.value.pets.find((pet: UserPet) => pet?.id === itemId)
    if (!selectedItem)
      displayErrorPage.value = true

    selectedPet.value = selectedItem
  }
  else if (tab === 'profiles') {
    openedTab.value = 1
    if (!itemId)
      return

    const selectedItem = user.value.profiles.find((profile: UserProfile) => profile?.id === itemId)
    if (!selectedItem)
      displayErrorPage.value = true

    selectedProfile.value = selectedItem
  }
  else { displayErrorPage.value = true }
}

const reloadData = async (): Promise<void> => {
  loading.value = true

  const { data } = await axiosIns.get(`/users/${route.params.id}`)

  user.value = data?.items[0]

  await processTabSelection()

  loading.value = false
}

onMounted(() => {
  reloadData()
})
</script>

<template>
  <div>
    <UserDetails
      v-if="!loading"
      :user="user"
      :enable-edit="false"
      :opened-tab="openedTab"
      :selected-pet="selectedPet"
      :selected-profile="selectedProfile"
    />
  </div>
</template>

<style scoped>

</style>
