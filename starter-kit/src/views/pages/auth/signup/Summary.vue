<script setup lang="ts">
interface Props {
  data: any
}

const props = defineProps<Props>()

const imagePreviewSrc = (object: any, key = 'avatar') => {
  const image = object[key][0]
  if (!image)
    return null

  return URL.createObjectURL(object[key][0])
}

// Pet
const petList = computed(() => {
  return props.data?.pets || []
})

const petFirstLetter = (pet: any) => {
  return `${pet?.name[0] || ''}`.trim().toUpperCase()
}

// Profile
const profileList = computed(() => {
  return props.data?.profiles || []
})

const profileFirstLetters = (profile: any) => {
  return `${profile.firstName[0] || ''}${profile.lastName[0] || ''}`.trim().toUpperCase()
}

const profileFullName = (profile) => {
  return `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
}

</script>

<template>
  <div>
  <!-- Basic data -->
    <h6 class="text-h6">
      <VIcon icon="mdi-account-cog" color="primary" />
      {{ $t('Account') }}
    </h6>
    <VList>
      <!-- Username -->
      <VListItem>
        <span class="font-weight-bold">
          Username:
        </span>
        <span class="text-body-2">{{ data.username || '-' }}</span>
      </VListItem>
      <!-- Email -->
      <VListItem>
        <span class="font-weight-bold">
          Email:
        </span>
        <span class="text-body-2">{{ data.email || '-' }}</span>
      </VListItem>
    </VList>

    <!-- Profiles -->
    <h6 class="text-h6">
      <VIcon icon="mdi-account-box-multiple" color="primary" />
      {{ $t('Profile', 2) }}
    </h6>

    <VList>
      <VListItem
        v-for="(profile, profileIndex) in profileList"
        :key="`summary_profile_${profileIndex}`"
        :title="profileFullName(profile)"
      >
        <template #prepend>
          <VAvatar
            :image="imagePreviewSrc(profile, 'avatar')"
            variant="tonal"
            class="cursor-pointer"
            color="primary"
            size="40"
          >
            <span>{{ profileFirstLetters(profile) }}</span>
          </VAvatar>
        </template>

        <template #append>
          <div>
            <VIcon icon="mdi-crown" style="color:#DEB82D;" />

            <VTooltip
              color="primary"
              activator="parent"
            >
              {{ profile.isPrimary ? $t('MainProfile') : $t('AdditionalProfile') }}
            </VTooltip>
          </div>
        </template>
      </VListItem>
    </VList>

    <!-- Pets -->
    <h6 class="text-h6">
      <VIcon icon="mdi-paw" color="primary" />
      {{ $t('Pet', 2) }}
    </h6>

    <VList>
      <VListItem
        v-for="(pet, petIndex) in petList"
        :key="`summary_pet_${petIndex}`"
        :title="pet.name"
      >
        <template #prepend>
          <VAvatar
            :image="imagePreviewSrc(pet, 'image')"
            variant="tonal"
            class="cursor-pointer"
            color="primary"
            size="40"
          >
            <span>{{ petFirstLetter(pet) }}</span>
          </VAvatar>
        </template>
      </VListItem>
    </VList>
  </div>
</template>

<style scoped>

</style>
