<script setup lang="ts">
import { requiredValidator } from '@core/utils/validators'

interface Props {
  pet: any
}

const props = defineProps<Props>()
const emits = defineEmits(['changeField'])

const petAvatarUpload = ref(null)

const imagePreviewSrc = computed(() => {
  const image = props.pet.images[0]
  if (!image)
    return null

  return URL.createObjectURL(props.pet.images[0])
})

const petFirstLetters = computed(() => {
  return `${props.pet.name[0] || ''}`.trim().toUpperCase()
})
</script>

<template>
  <!-- Edit :: START -->
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
        :model-value="pet.images"
        @update:modelValue="emits('changeField', { value: $event, key: 'images' })"
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
        :rules="[requiredValidator]"
        class="centred-input"
        placeholder="Wpisz Imię pupila"
        @update:modelValue="emits('changeField', { value: $event, key: 'name' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        :model-value="pet.breed"
        label="Rasa"
        placeholder="Border Collie"
        @update:modelValue="emits('changeField', { value: $event, key: 'breed' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        :model-value="pet.color"
        label="Kolor"
        placeholder="Border Collie"
        @update:modelValue="emits('changeField', { value: $event, key: 'color' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        :model-value="pet.personality"
        label="Osobowość"
        placeholder="Border Collie"
        @update:modelValue="emits('changeField', { value: $event, key: 'personality' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        :model-value="pet.age"
        type="number"
        label="Wiek"
        @update:modelValue="emits('changeField', { value: $event, key: 'age' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextarea
        :model-value="pet.description"
        rows="2"
        label="Opis pupila"
        @update:modelValue="emits('changeField', { value: $event, key: 'description' })"
      />
    </VCol>
  </VRow>
  <!-- Edit :: END -->
</template>

<style scoped lang="scss">

</style>
