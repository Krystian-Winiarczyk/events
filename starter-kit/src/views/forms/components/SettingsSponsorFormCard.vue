<script setup lang="ts">
import type { Sponsor } from '@/globals/types/types'
import { requiredValidator } from '@validators'
import { imagePath } from '@core/utils/formatters'

interface Props {
  sponsor: Sponsor
  showDelete: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['removeItem'])
const sponsorImageUploadRef = ref()

const imagePreviewSrc = (img: any) => {
  const image = img

  if (!image)
    return null

  if (image?.filename)
    return imagePath(image)

  return URL.createObjectURL(image)
}
</script>

<template>
  <div class="d-flex">
    <!-- Data -->
    <div class="flex-grow-1 mr-5">
      <VCardTitle class="text-primary my-2 mb-3">
        {{ $t('BasicData') }}
        <VBtn
          v-if="showDelete"
          size="sm"
          color="error"
          variant="plain"
          @click="emits('removeItem')"
        >
          <VIcon
            icon="mdi-trash"
            size="25"
          />
        </VBtn>
      </VCardTitle>

      <VRow>
        <VCol cols="6">
          <VTextField
            v-model="sponsor.name"
            density="compact"
            :rules="[requiredValidator]"
            :label="$t('Name')"
          />
        </VCol>
        <VCol cols="6">
          <VTextField
            v-model="sponsor.url"
            density="compact"
            :rules="[requiredValidator]"
            :label="$t('WebsiteUrl')"
          />
        </VCol>
        <VCol cols="12">
          <VTextarea
            v-model="sponsor.description"
            density="compact"
            rows="3"
            :label="$t('Description')"
          />
        </VCol>
      </VRow>
    </div>

    <!-- Images -->
    <div>
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
              ref="sponsorImageUploadRef"
              :model-value="sponsor.logo"
              class="d-none"
              show-size
              accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
              @update:model-value="[sponsor.logo] = $event"
            />
            <VAvatar
              :image="imagePreviewSrc(sponsor.logo)"
              variant="tonal"
              class="cursor-pointer"
              color="primary"
              rounded
              size="152"
              @click="sponsorImageUploadRef.click()"
            >
              <VIcon
                icon="mdi-cloud-upload"
                size="40"
              />
            </VAvatar>
          </div>
        </VCol>
      </VRow>
    </div>

    <VDivider vertical />
  </div>
</template>

<style scoped>

</style>
