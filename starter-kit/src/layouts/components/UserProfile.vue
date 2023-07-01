<script setup lang="ts">
import { useAuthStore } from '@/stores/root/Auth'

const auth = useAuthStore()
const user = auth.user
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
<!--    <VAvatar-->
<!--      class="cursor-pointer"-->
<!--      color="primary"-->
<!--      variant="tonal"-->
<!--    >-->
<!--      <VImg :src="user.profiles[0].avatar" />-->

<!--      &lt;!&ndash; SECTION Menu &ndash;&gt;-->
<!--      <VMenu-->
<!--        activator="parent"-->
<!--        width="230"-->
<!--        location="bottom end"-->
<!--        offset="14px"-->
<!--      >-->
<!--        <VList>-->
<!--          &lt;!&ndash; 👉 User Avatar & Name &ndash;&gt;-->
<!--          <VListItem @click="$router.push({ path: '/my/user' })">-->
<!--            <template #prepend>-->
<!--              <VListItemAction start>-->
<!--                <VBadge-->
<!--                  dot-->
<!--                  location="bottom right"-->
<!--                  offset-x="3"-->
<!--                  offset-y="3"-->
<!--                  color="success"-->
<!--                >-->
<!--                  <VAvatar-->
<!--                    color="primary"-->
<!--                    variant="tonal"-->
<!--                  >-->
<!--                    <VImg :src="user.profiles[0].avatar" />-->
<!--                  </VAvatar>-->
<!--                </VBadge>-->
<!--              </VListItemAction>-->
<!--            </template>-->

<!--            <VListItemTitle class="font-weight-semibold">-->
<!--              John Doe-->
<!--            </VListItemTitle>-->
<!--            <VListItemSubtitle>Admin</VListItemSubtitle>-->
<!--          </VListItem>-->

<!--          <VDivider class="my-2" />-->

<!--          &lt;!&ndash; 👉 Pets &ndash;&gt;-->
<!--          <VListItem-->
<!--            link-->
<!--            @click="$router.push({ path: '/my/profiles' })"-->
<!--          >-->
<!--            <template #prepend>-->
<!--              <VAvatar-->
<!--                class="me-2"-->
<!--                :image="user.profiles[0].avatar"-->
<!--                size="22"-->
<!--              />-->
<!--            </template>-->

<!--            <VListItemTitle>Profiles</VListItemTitle>-->
<!--          </VListItem>-->

<!--          &lt;!&ndash; 👉 Friends &ndash;&gt;-->
<!--          <VListItem-->
<!--            link-->
<!--            @click="$router.push({ path: '/my/friends' })"-->
<!--          >-->
<!--            <template #prepend>-->
<!--              <VIcon-->
<!--                class="me-2"-->
<!--                icon="mdi-users"-->
<!--                size="22"-->
<!--              />-->
<!--            </template>-->

<!--            <VListItemTitle>Friends</VListItemTitle>-->
<!--          </VListItem>-->

<!--          &lt;!&ndash; 👉 Pets &ndash;&gt;-->
<!--          <VListItem-->
<!--            link-->
<!--            @click="$router.push({ path: '/pets' })"-->
<!--          >-->
<!--            <template #prepend>-->
<!--              <VIcon-->
<!--                class="me-2"-->
<!--                icon="mdi-paw"-->
<!--                size="22"-->
<!--              />-->
<!--            </template>-->

<!--            <VListItemTitle>Pets</VListItemTitle>-->
<!--          </VListItem>-->

<!--          &lt;!&ndash; Divider &ndash;&gt;-->
<!--          <VDivider class="my-2" />-->

<!--          &lt;!&ndash; 👉 Logout &ndash;&gt;-->
<!--          <VListItem to="/login">-->
<!--            <template #prepend>-->
<!--              <VIcon-->
<!--                class="me-2"-->
<!--                icon="tabler-logout"-->
<!--                size="22"-->
<!--              />-->
<!--            </template>-->

<!--            <VListItemTitle>Logout</VListItemTitle>-->
<!--          </VListItem>-->
<!--        </VList>-->
<!--      </VMenu>-->
<!--      &lt;!&ndash; !SECTION &ndash;&gt;-->
<!--    </VAvatar>-->
  </VBadge>
</template>
