<script setup lang="ts">
interface Props {
  pet: any
  index: number | string
}

const props = defineProps<Props>()
const emits = defineEmits(['removePet', 'changeField'])

const isEdited = ref(true)

const imagePreviewSrc = computed(() => {
  const image = props.pet.image[0]
  if (!image)
    return `${props.pet.name.at(0)}${props.pet.name.at(1)}`.toUpperCase()

  return URL.createObjectURL(props.pet.avatar[0])
})

const areFieldsFilled = computed(() => {
  return props.pet.name
})
</script>

<template>
  <VCard variant="outlined">
    <VCardTitle class="mb-0 pb-0 d-flex justify-space-between">
      <div class="d-flex align-center">
        Zwierzak
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
            :model-value="pet.image"
            @update:modelValue="emits('changeField', { value: $event, key: 'image' })"
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
            :model-value="pet.name"
            density="compact"
            label="Imię futrzaka"
            placeholder="John"
            @update:modelValue="emits('changeField', { value: $event, key: 'name' })"
          />
        </VCol>
        <VCol cols="6">
          <VTextField
            :model-value="pet.breed"
            density="compact"
            label="Rasa"
            placeholder="Border Collie"
            @update:modelValue="emits('changeField', { value: $event, key: 'breed' })"
          />
        </VCol>
        <VCol cols="6">
          <VTextField
            :model-value="pet.color"
            density="compact"
            label="Kolor"
            placeholder="Border Collie"
            @update:modelValue="emits('changeField', { value: $event, key: 'color' })"
          />
        </VCol>
        <VCol cols="6">
          <VTextField
            :model-value="pet.personality"
            density="compact"
            label="Osobowość"
            placeholder="Border Collie"
            @update:modelValue="emits('changeField', { value: $event, key: 'personality' })"
          />
        </VCol>
        <VCol cols="6">
          <VTextField
            :model-value="pet.age"
            density="compact"
            type="number"
            label="Wiek"
            @update:modelValue="emits('changeField', { value: $event, key: 'age' })"
          />
        </VCol>
        <VCol cols="12">
          <VTextarea
            :model-value="pet.description"
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
        <VCol
          cols="12"
          class="d-flex justify-center"
        >
          <VAvatar
            :image="imagePreviewSrc"
            variant="tonal"
            color="primary"
            size="80"
          >
            {{ imagePreviewSrc }}
          </VAvatar>
        </VCol>
        <VCol
          cols="12"
          class="d-flex justify-center"
        >
          {{ pet.name }}
        </VCol>
        <VCol cols="12">
          {{ pet.description }}
        </VCol>
      </VRow>
    </VCardItem>
    <!-- Preview :: END -->
  </VCard>
</template>

<style scoped lang="scss">

</style>
