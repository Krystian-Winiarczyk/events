<template>
  <div>
    <h4>List of users</h4>
    <VBtn @click="reloadData">Reload</VBtn>
    <div v-if="!loading">
      <VList :key="`user_${userIndex}`" v-for="(user, userIndex) of users">
        <VListItem :key="`user_${userIndex}_${key}`" v-for="key in Object.keys(user)">
          <span class="font-weight-bold">{{ key }}:</span> {{ user[key] }}
        </VListItem>
      </VList>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">

import axiosIns from "@axios";

const users = ref([])
const loading = ref(false)

const reloadData = async () => {
  loading.value = true
  const { data } = await axiosIns.get('/users')

  users.value = data?.items || []
  console.log(data.items)
  loading.value = false
}

onMounted(async () => {
  await reloadData()
})

</script>

<style scoped>

</style>
