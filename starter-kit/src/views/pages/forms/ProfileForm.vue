<script setup lang="ts">
import type { Ref } from 'vue'
import { requiredValidator } from '@validators'
import { defaultProfile } from '@/globals/defaults'
import type { UserProfile } from '@/globals/types/types'
import { imagePath } from '@core/utils/formatters'
import { GENDER } from '@/globals/enums/enums'
import { useFilesUploader } from '@core/composable/useFilesUploader'
import axiosIns from '@axios'

import { useToastStore } from '@/store/toast'
import { useAuthStore } from '@/store/auth'

interface Props {
  defaultProfile?: UserProfile
}

const props = defineProps<Props>()

const emits = defineEmits(['close'])

const { upload } = useFilesUploader()
const { showMessage } = useToastStore()
const { user } = useAuthStore()

const profile: Ref<UserProfile> = ref({ ...defaultProfile })
const profileAvatarUploadRef = ref()
const loading = ref(false)

const genders: Array<any> = [
  { value: GENDER.MALE, label: GENDER.MALE },
  { value: GENDER.FEMALE, label: GENDER.FEMALE },
  { value: GENDER.OTHER, label: GENDER.OTHER },
]

const imagePreviewSrc = (img: any) => {
  const image = img

  if (!image)
    return null

  if (image?.filename)
    return imagePath(image)

  return URL.createObjectURL(image)
}

const profileFirstLetters = computed(() => {
  return `${profile.value.name[0] || ''}`.trim().toUpperCase()
})

const onSubmit = async () => {
  loading.value = true

  const item = { ...profile.value }

  if (item.avatar?.id) { item.avatar = item.avatar.id }
  else if (item.avatar) {
    const avatarResponse = await upload([item.avatar], 'Avatars', 'mdi-my', 'AVATAR')

    item.avatar = avatarResponse?.data?.items[0]?.id || null
  }
  else { item.avatar = null }

  setTimeout(async () => {
    try {
      let resp = null
      if (item?.id) {
        resp = await axiosIns.patch(`user/profiles/${item.id}`, item)
      }
      else {
        item.user = user.id
        resp = await axiosIns.post('user/profiles', item)
      }

      const [updatedItem] = resp?.data?.items

      showMessage('success', 'snackbar.PetChangesSaved', 'snackbar.ChangesSaved')

      emits('close', updatedItem)
    }
    catch (err) {
      showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingPet', 'snackbar.ProblemEncountered')
    }
    finally {
      loading.value = false
    }
  }, 1000)
}

onMounted(() => {
  if (props.defaultProfile)
    Object.assign(profile.value, JSON.parse(JSON.stringify(props.defaultProfile)))
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

        <VToolbarTitle>
          {{ $t(profile.id ? 'EditPet' : 'CreateNewPet') }}
        </VToolbarTitle>

        <VSpacer />

        <VToolbarItems>
          <VBtn
            variant="text"
            :loading="loading"
            @click="onSubmit"
          >
            {{ $t('Save') }}
          </VBtn>
        </VToolbarItems>
      </VToolbar>
    </div>
    <VForm class="pet-form d-flex justify-center mx-10">
      <VRow>
        <!-- Data -->
        <VCol
          sm="12"
          md="6"
        >
          <VCardTitle class="text-primary my-2 mb-3">
            {{ $t('BasicData') }}
          </VCardTitle>

          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="profile.firstName"
                :rules="[requiredValidator]"
                :label="$t('FirstName')"
              />
            </VCol>
            <VCol cols="6">
              <VTextField
                v-model="profile.lastName"
                :rules="[requiredValidator]"
                :label="$t('LastName')"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="profile.nickname"
                :label="$t('Nickname')"
              />
            </VCol>
          </VRow>

          <VCardTitle class="text-primary my-2 mb-3">
            {{ $t('AdditionalData') }}
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
                v-model="profile.birthDate"
                :label="$t('Birthday')"
                :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d' }"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSelect
                v-model="profile.gender"
                :items="genders"
                :label="$t('Gender')"
                clearable
                :item-title="t => $t(`Genders.${t.label}`)"
                clear-icon="mdi-close"
              >
                <template #selection="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ $t(`Genders.${data.item.value}`) }}
                </template>
              </VSelect>
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="profile.description"
                rows="2"
                :label="$t('ProfileDescription')"
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
            {{ $t('SocialMedias') }}
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="profile.websiteUrl"
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
                v-model="profile.youtubeUrl"
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
                v-model="profile.facebookUrl"
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
                v-model="profile.instagramUrl"
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
                v-model="profile.tiktokUrl"
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
                v-model="profile.twitterUrl"
                label="Twitter"
                placeholder="https://www.twitter.com/example"
                prepend-inner-icon="mdi-twitter"
              />
            </VCol>
          </VRow>

          <VCardTitle class="text-primary my-2 mb-3">
            {{ $t('MainImage') }}
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <div>
                <VFileInput
                  ref="profileAvatarUploadRef"
                  :model-value="profile.avatar"
                  class="d-none"
                  show-size
                  accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
                  @update:model-value="[profile.avatar] = $event"
                />
                <VAvatar
                  :image="imagePreviewSrc(profile.avatar)"
                  variant="tonal"
                  class="cursor-pointer"
                  color="primary"
                  rounded
                  size="160"
                  @click="profileAvatarUploadRef.click()"
                >
                  <span v-if="profileFirstLetters">{{ profileFirstLetters }}</span>
                  <VIcon
                    v-else
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

  .hover-next {
    .display-image {
      transition: all .25s;
    }

    &:hover .display-image {
      opacity: 1 !important;
    }
  }
}
</style>
