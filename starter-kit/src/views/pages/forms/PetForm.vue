<script setup lang="ts">
import type { Ref } from 'vue'
import { requiredValidator } from '@validators'
import { defaultPet } from '@/globals/defaults'
import type { UserPet } from '@/globals/types/types'
import { imagePath } from '@core/utils/formatters'
import { GENDER } from '@/globals/enums/enums'
import { useFilesUploader } from '@core/composable/useFilesUploader'
import axiosIns from "@axios";

interface Props {
  defaultPet?: UserPet
}

const props = defineProps<Props>()

const emits = defineEmits(['close'])

const { upload } = useFilesUploader()

const pet: Ref<UserPet> = ref({ ...defaultPet })
const petAvatarUploadRef = ref()
const petImageUploadRef = ref()

const genders: Array<any> = [
  { value: GENDER.FEMALE, label: GENDER.FEMALE },
  { value: GENDER.MALE, label: GENDER.MALE },
]

const imagePreviewSrc = (img: any) => {
  const image = img

  if (!image)
    return null

  if (image?.filename)
    return imagePath(image)

  return URL.createObjectURL(image)
}

const petFirstLetters = computed(() => {
  return `${pet.value.name[0] || ''}`.trim().toUpperCase()
})

const onSubmit = async () => {
  const item = { ...pet.value }

  if (item.avatar?.id) { item.avatar = item.avatar.id }
  else if (item.avatar) {
    const avatarResponse = await upload([item.avatar], 'Avatars', 'mdi-my', 'AVATAR')

    item.avatar = avatarResponse?.data?.items[0]?.id || null
  }
  else { item.avatar = null }

  if (item.images.length) {
    const imagesIds = item.images.filter(image => image?.id).map(image => image.id)

    const toUpload = item.images.filter(image => !image?.id)
    if (toUpload.length) {
      const imagesResponse = await upload(item.images, 'AdditionalImages', 'mdi-my', 'IMAGE')

      if (imagesResponse?.data?.items?.length)
        imagesIds.push(...imagesResponse?.data?.items.map(image => image.id))
    }

    item.images = imagesIds
  }
  else { item.images = [] }

  await axiosIns.patch(`users/pets/${item.id}`, item)
}

onMounted(() => {
  if (props.defaultPet)
    Object.assign(pet.value, JSON.parse(JSON.stringify(props.defaultPet)))
})
</script>

<template>
  <div>
    <div>
      <VToolbar color="primary">
        <VBtn
          icon
          variant="plain"
          @click="$emit('close')"
        >
          <VIcon
            color="white"
            icon="mdi-close"
          />
        </VBtn>

        <VToolbarTitle>Settings</VToolbarTitle>

        <VSpacer />

        <VToolbarItems>
          <VBtn
            variant="text"
            @click="onSubmit"
          >
            Save
          </VBtn>
        </VToolbarItems>
      </VToolbar>
    </div>
    <VForm class="pet-form d-flex justify-center">
      <VRow>
        <!-- Data -->
        <VCol
          sm="12"
          md="6"
        >
          <VCardTitle class="text-primary my-2 mb-3">
            Dane podstawowe
          </VCardTitle>

          <VRow>
            <VCol cols="12">
              <VTextField
                :model-value="pet.name"
                :rules="[requiredValidator]"
                :label="$t('FirstName')"
                :placeholder="$t('signup.TypePetName')"
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
                suffix="CM"
              />
            </VCol>
          </VRow>

          <VCardTitle class="text-primary my-2 mb-3">
            Dane dodatkowe
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.breeding"
                :label="$t('Breeding')"
                placeholder="Border Collie"
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
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.color"
                :label="$t('Color')"
                placeholder="Tricolor"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.weight"
                :label="$t('Weight')"
                placeholder="50"
                suffix="KG"
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
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSelect
                :model-value="pet.gender"
                :items="genders"
                :label="$t('Gender')"
                clearable
                :item-title="t => $t(`PetGenders.${t.label}`)"
                clear-icon="mdi-close"
              >
                <template #selection="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ $t(`PetGenders.${data.item.value}`) }}
                </template>
              </VSelect>
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextarea
                :model-value="pet.personality"
                rows="2"
                :label="$t('Personality')"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextarea
                :model-value="pet.description"
                rows="2"
                :label="$t('PetDescription')"
              />
            </VCol>
          </VRow>

          <VCardTitle class="text-primary my-2 mb-3">
            Profile społecznościowe
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.websiteUrl"
                :label="$t('Website')"
                placeholder="https://www.website.com"
                prepend-inner-icon="mdi-web"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.youtubeUrl"
                label="Youtube"
                placeholder="https://www.youtube.com/example"
                prepend-inner-icon="mdi-youtube"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.facebookUrl"
                label="Facebook"
                placeholder="https://www.facebook.com/example"
                prepend-inner-icon="mdi-facebook"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.instagramUrl"
                label="Instagram"
                placeholder="https://www.instagram.com/example"
                prepend-inner-icon="mdi-instagram"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.tiktokUrl"
                label="Tiktok"
                placeholder="https://www.tiktok.com/example"
                prepend-inner-icon="mdi-trash"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                :model-value="pet.twitterUrl"
                label="Twitter"
                placeholder="https://www.twitter.com/example"
                prepend-inner-icon="mdi-twitter"
              />
            </VCol>
          </VRow>
        </VCol>

        <!-- Images -->
        <VCol
          md="6"
          sm="12"
        >
          <VCardTitle class="text-primary my-2 mb-3">
            Zdjęcie główne
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <div>
                <VFileInput
                  ref="petAvatarUploadRef"
                  v-model="pet.avatar"
                  class="d-none"
                  show-size
                  accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
                />
                <VAvatar
                  :image="imagePreviewSrc(pet.avatar)"
                  variant="tonal"
                  class="cursor-pointer"
                  color="primary"
                  rounded
                  size="160"
                  @click="petAvatarUploadRef.click()"
                >
                  <span v-if="petFirstLetters">{{ petFirstLetters }}</span>
                  <VIcon
                    v-else
                    icon="mdi-cloud-upload"
                    size="40"
                  />
                </VAvatar>
              </div>
            </VCol>
          </VRow>

          <VCardTitle class="text-primary my-2 mb-3">
            Zdjęcia dodatkowe
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              class="d-flex"
            >
              <div>
                <VAvatar
                  v-for="(image, index) in pet.images"
                  :key="`pet_image_${index}`"
                  :image="imagePreviewSrc(image)"
                  variant="tonal"
                  class="mr-1 mb-1"
                  color="primary"
                  rounded
                  size="160"
                />
                <VFileInput
                  ref="petImageUploadRef"
                  class="d-none"
                  show-size
                  multiple
                  accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
                  :model-value="pet.images"
                  @update:modelValue="pet.images.push(...$event)"
                />
                <VAvatar
                  variant="tonal"
                  class="cursor-pointer mb-1"
                  color="primary"
                  rounded
                  size="160"
                  @click="petImageUploadRef.click()"
                >
                  <VIcon
                    icon="mdi-cloud-upload"
                    size="40"
                  />
                </VAvatar>
              </div>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style lang="scss">
.pet-form {
    & .pt-0 {
      .v-field__input {
        padding-top: 0 !important;
      }

      .v-input__details {
        margin-top: -20px !important;
      }
    }

    .v-list-item {
      min-height: 32px !important;
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    }
}
</style>
