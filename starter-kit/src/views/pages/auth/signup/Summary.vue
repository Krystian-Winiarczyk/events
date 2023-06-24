<script setup lang="ts">
import {formatDate} from "@core/utils/formatters";
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

// UserPet
const petFirstLetter = computed(() => {
  return `${props.data.pet?.name[0] || ''}`.trim().toUpperCase()
})

// Profile
const profileFirstLetters = computed(() => {
  return `${props.data.profile.firstName[0] || ''}${props.data.profile.lastName[0] || ''}`.trim().toUpperCase()
})

const profileFullName = computed(() => {
  return `${props.data.profile.firstName || ''} ${props.data.profile.lastName || ''}`.trim()
})
</script>

<template>
  <div>
    <!-- Basic data -->
    <VRow>
      <VCol cols="12">
        <h6 class="text-h6">
          <VIcon
            icon="mdi-account-cog"
            color="primary"
          />
          {{ $t('Account') }}
        </h6>
        <VRow class="mt-1">
          <VCol cols="12" md="6">
            <span class="font-weight-bold">
              {{ $t('Username') }}:
            </span>
            <span class="text-body-2">{{ data.username || '-' }}</span>
          </VCol>
          <VCol cols="12" md="6">
            <span class="font-weight-bold">
              {{ $t('Email') }}:
            </span>
            <span class="text-body-2">{{ data.email || '-' }}</span>
          </VCol>
        </VRow>
        <VDivider color="primary" class="mt-2" />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <h6 class="text-h6">
          <VIcon
            icon="mdi-account-box-multiple"
            color="primary"
          />
          {{ $t('Profile') }}
        </h6>

        <VList>
          <VListItem class="mb-3">
            <VAvatar
              :image="imagePreviewSrc(data.profile, 'avatar')"
              variant="tonal"
              class="cursor-pointer"
              color="primary"
              size="40"
            >
              <span>{{ profileFirstLetters }}</span>
            </VAvatar>
            {{ profileFullName }}
          </VListItem>

          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Nickname') }}:
            </span>
            <span class="text-body-2">{{ data.profile.nickname || '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Birthday') }}:
            </span>
            <span class="text-body-2">{{ formatDate(data.profile.birthDate) || '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Gender') }}:
            </span>
            <span class="text-body-2">{{ data.profile.gender ? $t(`Genders.${data.profile.gender}`) : '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Description') }}:
            </span>
            <span class="text-body-2">{{ data.profile.description || '-' }}</span>
          </VListItem>
        </VList>
      </VCol>

      <VCol cols="12" md="6">
        <!-- Pets -->
        <h6 class="text-h6">
          <VIcon
            icon="mdi-paw"
            color="primary"
          />
          {{ $t('Favorite') }}
        </h6>

        <VList>
          <VListItem class="mb-3">
            <VAvatar
              :image="imagePreviewSrc(data.pet, 'images')"
              variant="tonal"
              class="cursor-pointer"
              color="primary"
              size="40"
            >
              <span>{{ petFirstLetter }}</span>
            </VAvatar>
            {{ data.pet.name }}
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Breed') }}:
            </span>
            <span class="text-body-2">{{ data.pet.breed || '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Color') }}:
            </span>
            <span class="text-body-2">{{ data.pet.color || '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Personality') }}:
            </span>
            <span class="text-body-2">{{ data.pet.personality || '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Gender') }}:
            </span>
            <span class="text-body-2">{{ data.pet.gender ? $t(`PetGenders.${data.pet.gender}`) : '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Birthday') }}:
            </span>
            <span class="text-body-2">{{ formatDate(data.pet.birthDate) || '-' }}</span>
          </VListItem>
          <VListItem>
            <span class="font-weight-bold">
              {{ $t('Description') }}:
            </span>
            <span class="text-body-2">{{ data.pet.description || '-' }}</span>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>

</style>
