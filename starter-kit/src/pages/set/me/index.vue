<script setup lang="ts">
import Header from '@/components/settings/profile/Header.vue'
import Settings from '@/components/settings/profile/Settings.vue'
import type { User } from '@/types/types'
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
  <div class="d-flex flex-column gap-7">
    <Header :user="user" />

    <Settings :user="user" />
  </div>
</template>
