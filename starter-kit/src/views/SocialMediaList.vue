<script setup lang="ts">
interface Props {
  socialMediaLinks: {
    websiteUrl?: string
    youtubeUrl?: string
    facebookUrl?: string
    instagramUrl?: string
    tiktokUrl?: string
    twitterUrl?: string
  }
}

const props = defineProps<Props>()

const styleByMediaType = (type: string): { icon: string; color: string } => {
  if (type === 'websiteUrl')
    return { icon: 'mdi-web', color: 'primary' }
  if (type === 'youtubeUrl')
    return { icon: 'mdi-youtube', color: 'rgba(255,0,0,0.5)' }
  if (type === 'facebookUrl')
    return { icon: 'mdi-facebook', color: 'rgba(24,119,242,0.56)' }
  if (type === 'instagramUrl')
    return { icon: 'mdi-instagram', color: 'rgba(195,42,163,0.55)' }
  if (type === 'tiktokUrl')
    return { icon: 'mdi-trash', color: '#010101' }
  if (type === 'twitterUrl')
    return { icon: 'mdi-twitter', color: 'rgba(29,161,242,0.56)' }

  return { icon: 'mdi-minus', color: '' }
}
</script>

<template>
  <div class="d-flex justify-center mt-3">
    <div
      v-for="key in Object.keys(socialMediaLinks)"
      :key="`media_${key}`"
      class="mr-3 cursor-pointer"
      :class="{ 'd-none': !socialMediaLinks[key] }"
    >
      <VAvatar
        :icon="styleByMediaType(<string> key).icon"
        :color="styleByMediaType(<string> key).color"
        class="text-white"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
