<script setup lang="ts">
import type { Ref } from 'vue'
import type { Pet, User } from '@/globals/types/types'
import avatar from '@images/avatars/avatar-1.png'

const avatarPet = 'https://cdn.pixabay.com/photo/2018/05/11/08/11/dog-3389729_1280.jpg'

const user: User = {
  avatar,
  name: 'Emily Totsu',
  role: 'Pet Owner',
  email: 'etotsu@tesuto.eu',
}

const pet: Ref<Pet> = ref(
  {
    avatar: avatarPet,
    name: 'Testo',
    owner: user,
  },
)
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <!--    START::Picture    -->
    <div
      class="w-100 rounded-lg overflow-hidden position-relative"
      style="height: 60vh"
    >
      <img
        :src="pet.avatar"
        :alt="`The avatar of the ${pet.name}`"
        class="w-100 h-100 v-img__img--cover"
      >

      <VBtn
        icon="mdi-heart"
        class="position-absolute mx-3 my-4"
        style="top: 0; right: 0;"
      />
    </div>
    <!--    END::Picture    -->

    <!--    START::Header    -->
    <div class="d-flex flex-row align-center justify-space-between gap-2">
      <!--    START::Owner Name & Pet Name    -->
      <div class="d-flex flex-column">
        <p class="text-h6 text-white mb-0">
          {{ pet.name }}
        </p>

        <div class="text-subtitle-2 d-flex flex-row align-content-center gap-2">
          <VAvatar
            :image="pet.owner.avatar"
            size="16"
            style="top: .14rem"
          />

          {{ pet.owner.name }}
        </div>
      </div>
      <!--    END::Owner Name & Pet Name    -->

      <VBtn icon="mdi-gender-male" />
    </div>
    <!--    END::Header    -->

    <!--    START::Owner    -->
    <VCardItem
      class="pa-0"
      :prepend-avatar="pet.owner.avatar || ''"
      :title="pet.owner.name"
      :subtitle="pet.owner.email"
    />
    <!--    END::Owner    -->
  </div>
</template>
