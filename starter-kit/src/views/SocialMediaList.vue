<script setup lang="ts">
import type { UserPet, UserProfile } from '@/globals/types/types'

interface Props {
  item: UserProfile | UserPet
  size?: number
  color?: string
  justify?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  color: 'secondary',
  justify: 'justify-center',
})

const itemMediaObject = computed(() => {
  const {
    websiteUrl,
    youtubeUrl,
    facebookUrl,
    instagramUrl,
    tiktokUrl,
    twitterUrl,
  } = props.item

  return {
    websiteUrl,
    youtubeUrl,
    facebookUrl,
    instagramUrl,
    tiktokUrl,
    twitterUrl,
  }
})

const styleByMediaType = (type: string): string => {
  if (type === 'websiteUrl')
    return 'mdi-web'
  if (type === 'youtubeUrl')
    return 'mdi-youtube'
  if (type === 'facebookUrl')
    return 'mdi-facebook'
  if (type === 'instagramUrl')
    return 'mdi-instagram'
  if (type === 'tiktokUrl')
    return 'mdi-trash'
  if (type === 'twitterUrl')
    return 'mdi-twitter'

  return 'mdi-minus'
}

const openLink = (url: string) => window.open(url, '_blank')
</script>

<template>
  <div class="d-flex" :class="[justify]">
    <div
      v-for="key in Object.keys(itemMediaObject)"
      :key="`media_${key}`"
      class="mr-2 cursor-pointer"
      :class="{ 'd-none': !itemMediaObject[key] }"
    >
      <VAvatar
        :size="size"
        :icon="styleByMediaType(<string> key)"
        :color="color"
        rounded="sm"
        variant="tonal"
        class="cursor-pointer"
        @click="openLink(itemMediaObject[key])"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
