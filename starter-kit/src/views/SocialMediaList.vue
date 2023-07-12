<script setup lang="ts">
import {UserPet, UserProfile} from "@/globals/types/types";

interface Props {
  item: UserProfile | UserPet
}

const props = defineProps<Props>()

const itemMediaObject = computed(() => {
  const {
    websiteUrl,
    youtubeUrl,
    facebookUrl,
    instagramUrl,
    tiktokUrl,
    twitterUrl,
  } = props.item

  console.log(props.item)

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
  <div class="d-flex justify-center mt-3">
    <div
      v-for="key in Object.keys(itemMediaObject)"
      :key="`media_${key}`"
      class="mr-3 cursor-pointer"
      :class="{ 'd-none': !itemMediaObject[key] }"
    >
      <VAvatar
        :icon="styleByMediaType(<string> key)"
        color="secondary"
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
