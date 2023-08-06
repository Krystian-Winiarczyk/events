<script setup lang="ts">
import type { Sponsor } from '@/globals/types/types'
import { requiredValidator } from '@validators'
import { imagePath } from "@core/utils/formatters";

interface Props {
  sponsor: Sponsor
}

const props = defineProps<Props>()
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
        <VCol cols="12">
          <VTextField
            density="compact"
            v-model="sponsor.name"
            :rules="[requiredValidator]"
            :label="$t('Name')"
          />
        </VCol>
        <VCol cols="12">
          <VTextarea
            density="compact"
            v-model="sponsor.description"
            rows="3"
            :label="$t('Description')"
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
    </VCol>
  </VRow>
</template>

<style scoped>

</style>
