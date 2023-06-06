<script setup lang="ts">
interface Props {
  profile: any
  index: number | string
}

const props = defineProps<Props>()
const emits = defineEmits(['removeProfile', 'changeField', 'changePrimaryProfile'])

const profileAvatarUpload = ref(null)

const setProfileName = value => {
  const [firstName = '', lastName = ''] = value.split(' ')

  emits('changeField', { value: firstName, key: 'firstName' })
  emits('changeField', { value: lastName, key: 'lastName' })
}

const imagePreviewSrc = computed(() => {
  const avatar = props.profile.avatar[0]
  if (!avatar) return null

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
  <VCard>
    <VCardTitle class="mb-0 pb-0 d-flex justify-space-between">
      <div class="d-flex align-center">
        <div>
          <VCheckbox
            :model-value="profile.isPrimary"
            :disabled="profile.isPrimary"
            @update:modelValue="emits('changePrimaryProfile')"
          />
          <VTooltip color="primary" activator="parent">
            {{ profile.isPrimary ? 'Profil główny' : 'Profil dodatkowy' }}
          </VTooltip>
        </div>
        {{ profileFullName || 'Profil' }}
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
            size="70"
            @click="profileAvatarUpload.click()"
          >
            <span v-if="profileFirstLetters">{{ profileFirstLetters }}</span>
            <VIcon icon="mdi-cloud-upload" v-else />
          </VAvatar>
        </VCol>
        <VCol
          cols="12"
          class="text-center"
        >
          <VTextField
            variant="plain"
            :model-value="profileFullName"
            density="compact"
            class="centred-input"
            placeholder="Wpisz Imię i nazwisko"
            @update:modelValue="setProfileName"
          />
        </VCol>
        <VCol cols="12">
          <VTextarea
            :model-value="profile.description"
            density="compact"
            rows="2"
            label="Opis profilu"
            @update:modelValue="emits('changeField', { value: $event, key: 'description' })"
          />
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<style lang="scss">
  .centred-input input {
    text-align: center;
  }
</style>
