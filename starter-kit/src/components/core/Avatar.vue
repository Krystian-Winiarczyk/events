<template>
  <div>
    <VAvatar
      :image="item.avatar"
      variant="tonal"
      class="cursor-pointer"
      color="primary"
      size="40"
    >
      <span>{{ avatarNoImageLetters }}</span>
    </VAvatar>
  </div>
</template>

<script setup lang="ts">

interface Props {
  item: any,
}

const props = withDefaults(defineProps<Props>(), {
  item: { name: '', avatar: '' },
})

const avatarNoImageLetters = computed(() => {
  const [firstName = '', lastName = ''] = props.item.name.split(' ')

  return `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`.trim()
})

onMounted(() => {
  console.log('123 321 ')
})

</script>

<style scoped>

</style>
