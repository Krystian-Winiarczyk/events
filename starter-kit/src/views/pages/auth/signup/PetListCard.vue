<script setup lang="ts">
import { requiredValidator } from '@core/utils/validators'
import type { Pet } from '@/globals/types/types'
import {GENDER} from "@/globals/enums/enums";

interface Props {
  pet: Pet
}

const props = defineProps<Props>()
const emits = defineEmits(['changeField'])

const genders: Array<any> = [
  { value: GENDER.FEMALE, label: GENDER.FEMALE },
  { value: GENDER.MALE, label: GENDER.MALE },
]

const petAvatarUpload = ref(null)

// START :: Computed
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
      class="d-flex align-center justify-center"
    >
      <div>
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
          size="60"
          @click="petAvatarUpload.click()"
        >
          <span v-if="petFirstLetters">{{ petFirstLetters }}</span>
          <VIcon
            v-else
            icon="mdi-cloud-upload"
          />
        </VAvatar>
      </div>

      <VTextField
        class="pt-0 pl-2"
        variant="plain"
        :model-value="pet.name"
        :rules="[requiredValidator]"
        :placeholder="$t('signup.TypePetName')"
        @update:modelValue="emits('changeField', { value: $event, key: 'name' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        :model-value="pet.passportNumber"
        :label="$t('PassportNumber')"
        placeholder="PL5532-123"
        @update:modelValue="emits('changeField', { value: $event, key: 'passportNumber' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        :model-value="pet.breed"
        :label="$t('Breed')"
        placeholder="Border Collie"
        @update:modelValue="emits('changeField', { value: $event, key: 'breed' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        :model-value="pet.height"
        :label="$t('HeightAtTheWithers')"
        placeholder="50"
        suffix="cm"
        @update:modelValue="emits('changeField', { value: $event, key: 'height' })"
      />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <AppDateTimePicker
        :model-value="pet.birthDate"
        :label="$t('Birthday')"
        :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d' }"
        @update:modelValue="emits('changeField', { value: $event, key: 'birthDate' })"
      />
    </VCol>
    <VCol cols="12">
      <VSelect
        :model-value="pet.gender"
        :items="genders"
        :label="$t('Gender')"
        clearable
        :item-title="t => $t(`PetGenders.${t.label}`)"
        clear-icon="mdi-close"
        @update:modelValue="emits('changeField', { value: $event, key: 'gender' })"
      >
        <template #selection="data">
          <!-- HTML that describe how select should render items when the select is open -->
          {{ $t(`PetGenders.${data.item.value}`) }}
        </template>
      </VSelect>
    </VCol>
    <VCol cols="12">
      <VTextarea
        :model-value="pet.description"
        rows="2"
        :label="$t('PetDescription')"
        @update:modelValue="emits('changeField', { value: $event, key: 'description' })"
      />
    </VCol>
  </VRow>
  <!-- Edit :: END -->
</template>

<style scoped lang="scss">

</style>
