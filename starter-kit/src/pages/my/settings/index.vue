<script setup lang="ts">
import Header from '@/components/my/settings/profile/Header.vue'
import Settings from '@/components/my/settings/profile/Settings.vue'
import type { User } from '@/globals/types/types'
import avatar from '@images/avatars/avatar-1.png'

const user: User = {
  avatar,
  name: 'Emily Totsu',
  role: 'Pet Owner',
  email: 'etotsu@tesuto.eu',
  socials: [
    {
      type: 'FACEBOOK',
      href: 'https://www.facebook.com/',
    },
    {
      type: 'LINKEDIN',
      href: 'https://www.linkedin.com/',
    },
    {
      type: 'INSTAGRAM',
      href: 'https://www.instagram.com/',
    },
  ],
}
</script>

<template>
  <div
    class="
      d-flex flex-column flex-1-0 margin-center

      flex-md-0-0
    "

    :style="isSM ? 'row-gap: 2rem' : 'row-gap: 1rem'"
  >
    <Header :user="user" />

    <Settings :user="user" />
  </div>
</template>
