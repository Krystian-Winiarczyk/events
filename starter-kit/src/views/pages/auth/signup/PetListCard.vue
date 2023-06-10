<script setup lang="ts">
interface Props {
  pet: any
  index: number | string
}

const props = defineProps<Props>()
const emits = defineEmits(['removePet', 'changeField'])

const petAvatarUpload = ref(null)

const isEdited = ref(true)

const imagePreviewSrc = computed(() => {
  const image = props.pet.image[0]
  if (!image)
    return null

  return URL.createObjectURL(props.pet.image[0])
})

const petFirstLetters = computed(() => {
  return `${props.pet.name[0] || ''}`.trim().toUpperCase()
})
</script>

<template>
  <VCard>
    <VCardTitle class="mb-0 pb-0 d-flex justify-space-between">
      <div class="d-flex align-center">
        {{ $t('Favorite') }}
      </div>
      <div>
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
    <VCardItem class="mt-0 pt-2">
      <VRow class="pt-2">
        <VCol
          cols="12"
          class="d-flex align-center justify-center mb-0 pb-0"
        >
          <VFileInput
            ref="petAvatarUpload"
            class="d-none"
            show-size
            accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
            :model-value="pet.image"
            @update:modelValue="emits('changeField', { value: $event, key: 'image' })"
          />
          <VAvatar
            :image="imagePreviewSrc"
            variant="tonal"
            class="cursor-pointer"
            color="primary"
            size="70"
            @click="petAvatarUpload.click()"
          >
            <span v-if="petFirstLetters">{{ petFirstLetters }}</span>
            <VIcon
              v-else
              icon="mdi-cloud-upload"
            />
          </VAvatar>
        </VCol>
        <VCol
          cols="12"
          class="text-center"
        >
          <VTextField
            variant="plain"
            :model-value="pet.name"
            density="compact"
            class="centred-input"
            placeholder="Wpisz Imię pupila"
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
            rows="2"
            label="Opis pupila"
            @update:modelValue="emits('changeField', { value: $event, key: 'description' })"
          />
        </VCol>
      </VRow>
    </VCardItem>
    <!-- Edit :: END -->
  </VCard>
</template>

<style scoped lang="scss">

</style>
