<script setup lang="ts">
import { requiredValidator } from '@core/utils/validators'
import type { UserProfile } from '@/globals/types/types'
import { GENDER } from '@/globals/enums/enums'

interface Props {
  profile: UserProfile
}

const props = defineProps<Props>()
const emits = defineEmits(['changeField'])

const profileAvatarUpload = ref(null)

const setProfileName = (value: string): void => {
  const [firstName = '', lastName = ''] = value.split(' ')

  emits('changeField', { value: firstName, key: 'firstName' })
  emits('changeField', { value: lastName, key: 'lastName' })
}

// START :: Data
const genders: Array<any> = Object.keys(GENDER).map(key => ({ value: key, label: key }))

// START :: Computed
const imagePreviewSrc = computed((): (string | null) => {
  const avatar = props.profile.avatar[0]
  if (!avatar)
    return null

  return URL.createObjectURL(props.profile.avatar[0])
})

const profileFirstLetters = computed((): string => {
  return `${props.profile.firstName[0] || ''}${props.profile.lastName[0] || ''}`.trim().toUpperCase()
})

const profileFullName = computed((): string => {
  return `${props.profile.firstName || ''} ${props.profile.lastName || ''}`.trim()
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      class="d-flex align-center justify-center"
    >
      <div>
        <VFileInput
          ref="profileAvatarUpload"
          class="d-none"
          show-size
          accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
          :model-value="profile.avatar"
          @update:modelValue="emits('changeField', { value: $event, key: 'avatar' })"
        />
        <VAvatar
          :image="imagePreviewSrc"
          variant="tonal"
          class="cursor-pointer"
          color="primary"
          size="60"
          @click="profileAvatarUpload.click()"
        >
          <span v-if="profileFirstLetters">{{ profileFirstLetters }}</span>
          <VIcon
            v-else
            icon="mdi-cloud-upload"
          />
        </VAvatar>
      </div>
      <VTextField
        class="pt-0 pl-2"
        variant="plain"
        :model-value="profileFullName"
        :rules="[requiredValidator]"
        :placeholder="$t('signup.TypeNameAndLastName')"
        @update:modelValue="setProfileName"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        :model-value="profile.nickname"
        :label="$t('Nickname')"
        @update:modelValue="emits('changeField', { value: $event, key: 'nickname' })"
      />
    </VCol>
    <VCol cols="12" md="6">
      <AppDateTimePicker
        :model-value="profile.birthDate"
        :label="$t('Birthday')"
        :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d' }"
        @update:modelValue="emits('changeField', { value: $event, key: 'birthDate' })"
      />
    </VCol>
    <VCol cols="12">
      <VSelect
        :model-value="profile.gender"
        :items="genders"
        :label="$t('Gender')"
        clearable
        :item-title="t => $t(`Genders.${t.label}`)"
        clear-icon="mdi-close"
        @update:modelValue="emits('changeField', { value: $event, key: 'gender' })"
      >
        <template #selection="data">
          <!-- HTML that describe how select should render items when the select is open -->
          {{ $t(`Genders.${data.item.value}`) }}
        </template>
      </VSelect>
    </VCol>
    <VCol cols="12">
      <VTextarea
        :model-value="profile.description"
        rows="2"
        :label="$t('ProfileDescription')"
        @update:modelValue="emits('changeField', { value: $event, key: 'description' })"
      />
    </VCol>
  </VRow>
</template>

<style lang="scss">
  .centred-input input {
    text-align: center;
  }
</style>
