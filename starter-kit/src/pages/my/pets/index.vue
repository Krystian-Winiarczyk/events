<script setup lang="ts">
import type { Ref } from 'vue'
import type { Pet, User } from '@/globals/types/types'
import avatar from '@images/avatars/avatar-1.png'

const avatarPet = 'https://cdn.pixabay.com/photo/2018/05/11/08/11/dog-3389729_1280.jpg'

const filters = ref([])

const user: User = {
  avatar,
  name: 'Emily Totsu',
  role: 'Pet Owner',
  email: 'etotsu@tesuto.eu',
}

const pets: Ref<Pet[]> = ref([
  {
    avatar: avatarPet,
    name: 'Testo',
    owner: user,
  },
  {
    avatar: avatarPet,
    name: 'Testo',
    owner: user,
  },
  {
    avatar: avatarPet,
    name: 'Testo',
    owner: user,
  },
  {
    avatar: avatarPet,
    name: 'Testo',
    owner: user,
  },
  {
    avatar: avatarPet,
    name: 'Testo',
    owner: user,
  },
])
</script>

<template>
  <div class="d-flex flex-column gap-5">
    <VCard
      style="background: linear-gradient(0deg, #B53D47 0%, #F25260 100%)"
      rounded="lg"
    >
      <template #title>
        Save The Animals!
      </template>

      <template #text>
        <div class="d-flex flex-column align-start">
          Many animals require our help! See how you can assist them alongside us.

          <VBtn
            rounded="pill"
            class="mt-5"
          >
            Help!

            <VIcon
              end
              icon="mdi-heart"
            />
          </VBtn>
        </div>
      </template>
    </VCard>

    <div class="d-flex flex-column gap-3">
      <label>I want to see</label>

      <div class="d-flex flex-row gap-3">
        <FilterItem
          v-model="filters"
          label="My"
          input-value="my"
          icon="mdi-user"
        />

        <FilterItem
          v-model="filters"
          label="New"
          input-value="new"
          icon="mdi-star"
        />

        <FilterItem
          v-model="filters"
          label="Lovers"
          input-value="lovers"
          icon="mdi-heart"
        />
      </div>
    </div>

    <VRow>
      <VCol
        v-for="(pet, i) in pets"
        :key="i"
        cols="6"
        md="3"
        lg="2"
      >
        <ListItem :pet="pet" />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>

</style>
