<script setup lang="ts">
import { useAuthStore } from '@/stores/root/Auth'

const auth = useAuthStore()
const friends = auth.user.activeProfile.friends
const suggestedFriends = auth.user.profiles[0].friends

const searchQuery = ref('')
</script>

<template>
  <VTextField
    v-model="searchQuery"
    density="comfortable"
    variant="plain"
    class="app-bar-autocomplete-box mt-n3 pb-3 sticky-to-top"
    placeholder="Search…"
  >
    <template #prepend-inner>
      <div class="d-flex align-center text-high-emphasis me-1">
        <VIcon
          size="22"
          class="mt-2"
          icon="mdi-magnify"
          :style="searchQuery.length ? 'opacity: 1' : 'opacity: .5'"
        />
      </div>
    </template>

    <template #append-inner>
      <div class="d-flex align-center">
        <IconBtn
          v-if="searchQuery.length"
          size="x-small"
        >
          <VIcon icon="mdi-close" />
        </IconBtn>
      </div>
    </template>
  </VTextField>

  <div class="d-flex flex-column gap-y-5">
    <VList
      v-if="friends.length"
      lines="two"
      border
      rounded
    >
      <template
        v-for="(friend, index) of friends"
        :key="friend.name"
      >
        <VListItem>
          <template #prepend>
            <VAvatar
              :image="friend.avatar"
              rounded="lg"
            />
          </template>

          <VListItemTitle>
            {{ friend.name }}
          </VListItemTitle>

          <template #append>
            <VBtn
              icon="mdi-trash"
              variant="text"
              size="small"
              color="danger"
            />
          </template>
        </VListItem>

        <VDivider v-if="index !== friends.length - 1" />
      </template>
    </VList>

    <div>
      <h3 class="text-capitalize text-secondary mb-2">
        you may also know
      </h3>

      <VList
        v-if="suggestedFriends.length"
        lines="two"
        border
        rounded
      >
        <template
          v-for="(friend, index) of suggestedFriends"
          :key="friend.name"
        >
          <VListItem>
            <template #prepend>
              <VAvatar
                :image="friend.avatar"
                rounded="lg"
              />
            </template>

            <VListItemTitle>
              {{ friend.name }}
            </VListItemTitle>

            <VListItemSubtitle class="mt-1 d-flex align-content-center gap-x-2">
              Friends with

              <VAvatar
                :image="friend.avatar"
                rounded="lg"
                size="16"
              />
            </VListItemSubtitle>

            <template #append>
              <VBtn size="small">
                Add
              </VBtn>
            </template>
          </VListItem>

          <VDivider v-if="index !== friends.length - 1" />
        </template>
      </VList>
    </div>
  </div>
</template>
