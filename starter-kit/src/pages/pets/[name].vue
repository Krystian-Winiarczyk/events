<script setup lang="ts">
import type { Ref } from 'vue'
import type { Pet, User } from '@/globals/types/types'
import avatar from '@images/avatars/avatar-1.png'
import ReadMore from '@/components/root/ReadMore.vue'

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
    dsc: 'One popular sainthood i give you: view each other. Music doesn’t spiritually discover any wind — but the guru is what sits. Not hell or paradise, avoid the acceptance.',
  },
)
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <!--    START::Picture    -->
    <div
      class="d-flex flex-column align-center"
      style="row-gap: 1rem; column-gap: .64rem;"
    >
      <Avatar :image="pet.avatar" />
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
          He's my owner

          <VBtn
            variant="text"
            size="sm"
            @click="$router.push({ path: `/user/${pet.owner.name}` })"
          >
            <template #prepend>
              <VAvatar
                :image="pet.owner.avatar"
                size="16"
              />
            </template>

            <p class="mx-1 mb-0">
              {{ pet.owner.name }}
            </p>
          </VBtn>
        </div>
      </div>
      <!--    END::Owner Name & Pet Name    -->

      <VBtn
        variant="text"
        icon="mdi-gender-male"
      />
    </div>
    <!--    END::Header    -->

    <div class="d-flex flex-wrap gap-x-6 gap-y-3">
      <div>
        <p class="mb-0">
          Breed
        </p>

        <p class="text-h6 mb-0">
          Golden
        </p>
      </div>

      <div>
        <p class="mb-0">
          Weight
        </p>

        <p class="text-h6 mb-0">
          2.4kg
        </p>
      </div>

      <div>
        <p class="mb-0">
          Age
        </p>

        <p class="text-h6 mb-0">
          5
        </p>
      </div>
    </div>

    <ReadMore :text="pet.dsc" />
  </div>
</template>
