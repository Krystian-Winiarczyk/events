<script setup lang="ts">
import { useAuthStore } from '@/stores/root/Auth'

const auth = useAuthStore()
const user = ref(auth.user)

watch(auth, async n => {
  user.value = n.user
})
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="user.activeProfile.avatar" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem @click="$router.push({ path: '/my/user' })">
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="user.activeProfile.avatar" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user.activeProfile.name }}
            </VListItemTitle>

            <VListItemSubtitle>
              {{ user.role.name.capitalize() }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Pets -->
          <VListItem
            link
            @click="$router.push({ path: '/my/profiles' })"
          >
            <template #prepend>
              <VAvatar
                class="me-2"
                :image="user.profiles[0].avatar"
                size="22"
              />
            </template>

            <VListItemTitle>Profiles</VListItemTitle>
          </VListItem>

          <!-- 👉 Friends -->
          <VListItem
            link
            @click="$router.push({ path: '/my/friends' })"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-users"
                size="22"
              />
            </template>

            <VListItemTitle>Friends</VListItemTitle>
          </VListItem>

          <!-- 👉 Pets -->
          <VListItem
            link
            @click="$router.push({ path: '/pets' })"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-paw"
                size="22"
              />
            </template>

            <VListItemTitle>Pets</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
