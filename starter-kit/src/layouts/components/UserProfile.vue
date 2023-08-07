<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { imagePath } from '@core/utils/formatters'

const { user } = storeToRefs(useAuthStore())

const authStore = useAuthStore()
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
    <!-- SECTION Menu -->
    <VMenu
      activator="parent"
      width="230"
      location="bottom end"
      offset="14px"
      v-if="user"
    >
      <template #activator="{ props }">
        <Avatar
          class="cursor-pointer"
          :size="40"
          :item="user.primaryProfile"
          v-bind="props"
        />
      </template>
      <VList>
        <!-- 👉 User Avatar & Name -->
        <VListItem @click="$router.push({ path: '/my/profile' })">
          <template #prepend>
            <VListItemAction start>
              <VBadge
                dot
                location="bottom right"
                offset-x="3"
                offset-y="3"
                color="success"
              >
                <Avatar
                  :size="35"
                  color="primary"
                  variant="tonal"
                  :item="user.primaryProfile"
                >
                  <VImg :src="imagePath(user.primaryProfile.avatar)" />
                </Avatar>
              </VBadge>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ user.name }}
          </VListItemTitle>
          <VListItemSubtitle class="text-capitalize">
            {{ user.role }}
          </VListItemSubtitle>
        </VListItem>

        <!-- 👉 Pets -->
        <!--          <VListItem -->
        <!--            link -->
        <!--            @click="" -->
        <!--          > -->
        <!--            <template #prepend> -->
        <!--              <VIcon -->
        <!--                class="me-2" -->
        <!--                icon="mdi-user" -->
        <!--                size="22" -->
        <!--              /> -->
        <!--            </template> -->

        <!--            <VListItemTitle>{{ $t('Profile', 1) }}</VListItemTitle> -->
        <!--          </VListItem> -->

        <!-- Divider -->
        <VDivider class="my-2" />

        <!-- 👉 Logout -->
        <VListItem @click="authStore.logout()">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="tabler-logout"
              size="22"
            />
          </template>

          <VListItemTitle>{{ $t('Logout') }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </VBadge>
</template>
