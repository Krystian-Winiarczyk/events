<script setup lang="ts">
interface Props {
  profile: any
  index: number | string
}

const props = defineProps<Props>()
const emits = defineEmits(['removeProfile', 'changeField', 'changePrimaryProfile'])

const isEdited = ref(true)

const imagePreviewSrc = computed(() => {
  const avatar = props.profile.avatar[0]
  if (!avatar)
    return `${props.profile.firstName.at(0)}${props.profile.lastName.at(0)}`.toUpperCase()

  return URL.createObjectURL(props.profile.avatar[0])
})

const areFieldsFilled = computed(() => {
  return props.profile.firstName && props.profile.lastName
})
</script>

<template>
  <VCard variant="outlined">
    <VCardTitle class="mb-0 pb-0 d-flex justify-space-between">
      <div class="d-flex align-center">
        <VCheckbox :model-value="profile.isPrimary" :disabled="profile.isPrimary" @update:modelValue="emits('changePrimaryProfile')" />
        Profil {{ profile.isPrimary ? 'główny' : 'dodatkowy' }}
      </div>
      <div>
        <VBtn
          class="mr-2"
          density="compact"
          variant="text"
          :disabled="!areFieldsFilled"
          :icon="isEdited ? 'mdi-eye' : 'mdi-edit'"
          color="secondary"
          @click="isEdited = !isEdited"
        />
        <VBtn
          density="compact"
          variant="text"
          icon="mdi-trash"
          color="secondary"
          @click="emits('removeProfile')"
        />
      </div>
    </VCardTitle>
    <!-- Edit :: START -->
    <VCardItem
      v-if="isEdited"
      class="mt-0 pt-2"
    >
      <VRow class="pt-2">
        <VCol cols="12">
          <VFileInput
            density="compact"
            show-size
            accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
            prepend-icon="mdi-camera-outline"
            label="Avatar"
            :model-value="profile.avatar"
            @update:modelValue="emits('changeField', { value: $event, key: 'avatar' })"
          >
            <template #selection="{ fileNames }">
              <template
                v-for="fileName in fileNames"
                :key="fileName"
              >
                <VChip
                  label
                  size="small"
                  variant="outlined"
                  color="primary"
                  class="me-2"
                >
                  {{ $filters.truncate(fileName, 14) }}
                </VChip>
              </template>
            </template>
          </VFileInput>
        </VCol>
        <VCol cols="12">
          <VTextField
            :model-value="profile.firstName"
            density="compact"
            label="Imię"
            placeholder="John"
            @update:modelValue="emits('changeField', { value: $event, key: 'firstName' })"
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            :model-value="profile.lastName"
            density="compact"
            label="Nazwisko"
            placeholder="Doe"
            @update:modelValue="emits('changeField', { value: $event, key: 'lastName' })"
          />
        </VCol>
        <VCol cols="12">
          <VTextarea
            :model-value="profile.description"
            density="compact"
            label="Kilka słów opisu"
            @update:modelValue="emits('changeField', { value: $event, key: 'description' })"
          />
        </VCol>
      </VRow>
    </VCardItem>
    <!-- Edit :: END -->
    <!-- Preview :: START -->
    <VCardItem
      v-else
      class="mt-0 pt-2"
    >
      <VRow class="pt-2">
        <VCol cols="12" class="d-flex justify-center">
          <VAvatar :image="imagePreviewSrc" variant="tonal" color="primary" size="80">
            {{ imagePreviewSrc }}
          </VAvatar>
        </VCol>
        <VCol cols="12" class="d-flex justify-center">
          {{ profile.firstName }} {{ profile.lastName }}
        </VCol>
        <VCol cols="12">
          {{ profile.description }}
        </VCol>
      </VRow>
    </VCardItem>
    <!-- Preview :: END -->
  </VCard>
</template>

<style scoped lang="scss">

</style>
