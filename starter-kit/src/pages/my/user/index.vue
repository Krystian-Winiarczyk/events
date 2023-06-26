<script setup lang="ts">
import { User } from '@/globals/objects/root/User'

const Admin = {
  name: 'admin',
}

const test = new User(Admin, 'test@tesuto.ts')
</script>

<template>
  <div
    class="
      d-flex flex-column flex-1-0 margin-center

      flex-md-0-0
    "

    :style="isSM ? 'row-gap: 2rem' : 'row-gap: 1rem'"
  >
    {{ test.email }}

    <!--    <Header :user="user" /> -->

    <!--    <Settings :user="user" /> -->
  </div>
</template>
