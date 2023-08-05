<script lang="ts" setup>
import axiosIns from '@axios'
import UserDetails from '@/views/pages/profile/UserDetails.vue'

const loading = ref(false)
const user = ref(null)

const route = useRoute()

const reloadData = async () => {
  loading.value = true

  const { data } = await axiosIns.get(`/users/${route.params.id}`)

  user.value = data?.items[0]

  loading.value = false
}

onMounted(() => {
  reloadData()
})
</script>

<template>
  <UserDetails
    :user="user"
    :enable-edit="false"
  />
</template>

<style scoped>

</style>
