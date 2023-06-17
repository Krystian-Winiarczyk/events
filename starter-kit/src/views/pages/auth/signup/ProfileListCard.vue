<script setup lang="ts">
import { requiredValidator } from '@core/utils/validators'

interface Props {
  profile: any
}

const props = defineProps<Props>()
const emits = defineEmits(['changeField'])

const profileAvatarUpload = ref(null)

const setProfileName = value => {
  const [firstName = '', lastName = ''] = value.split(' ')

  emits('changeField', { value: firstName, key: 'firstName' })
  emits('changeField', { value: lastName, key: 'lastName' })
}

const imagePreviewSrc = computed(() => {
  const avatar = props.profile.avatar[0]
  if (!avatar)
    return null

  return URL.createObjectURL(props.profile.avatar[0])
})

const profileFirstLetters = computed(() => {
  return `${props.profile.firstName[0] || ''}${props.profile.lastName[0] || ''}`.trim().toUpperCase()
})

const profileFullName = computed(() => {
  return `${props.profile.firstName || ''} ${props.profile.lastName || ''}`.trim()
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      class="d-flex align-center justify-center align-center"
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
    <VCol cols="6">
      <VTextField
        :model-value="profile.nickname"
        :label="$t('Nickname')"
        @update:modelValue="emits('changeField', { value: $event, key: 'nickname' })"
      />
    </VCol>
    <VCol cols="6">
      <VSelect
        v-model="value"
        :items="items"
        item-title="name"
        item-value="name"
        label="Select Item"
        placeholder="Select Item"
        multiple
        clearable
        clear-icon="mdi-close"
      >
        <template #selection="{ item }">
          <VChip>
            <VAvatar
              start
              :image="item.raw.avatar"
            />
            <span>{{ item.title }}</span>
          </VChip>
        </template>
      </VSelect>
      <VTextField
        :model-value="profile.nickname"
        :label="$t('Sex')"
        @update:modelValue="emits('changeField', { value: $event, key: 'nickname' })"
      />
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
