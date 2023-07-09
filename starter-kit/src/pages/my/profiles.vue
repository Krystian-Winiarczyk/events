<script setup lang="ts">
import { useAuthStore } from '@/stores/root/Auth'

const auth = useAuthStore()
const activeProfile = ref(auth.user.activeProfile)
const profiles = auth.user.profiles

const isDialogVisible = ref(false)

watch(auth, async n => {
  activeProfile.value = n.user.activeProfile
})
</script>

<template>
  <VList
    lines="two"
    border
    rounded
  >
    <template
      v-for="(profile, index) of profiles"
      :key="profile.name"
    >
      <VListItem
        :active="profile.key === activeProfile.key"
        :disabled="profile.key === activeProfile.key"
        @click="auth.switchProfile(profile.key)"
      >
        <template #prepend>
          <VAvatar :image="profile.avatar" />
        </template>

        <VListItemTitle>
          {{ profile.name }}
        </VListItemTitle>

        <VListItemSubtitle class="mt-1">
          {{ profile.dsc.split('.')[0] }}.
        </VListItemSubtitle>

        <template
          v-if="index"
          #append
        >
          <VDialog
            v-model="isDialogVisible"
            persistent
            class="v-dialog-sm"
          >
            <!-- Dialog Activator -->
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                icon="mdi-trash"
                variant="text"
                size="small"
              />
            </template>

            <!-- Dialog Content -->
            <VCard title="Confirm Profile Deletion">
              <DialogCloseBtn
                variant="text"
                size="small"
                @click="isDialogVisible = false"
              />

              <VCardText>
                Deleting a profile is not reversible.
              </VCardText>

              <VCardActions>
                <VSpacer />
                <VBtn
                  color="error"
                  @click="isDialogVisible = false"
                >
                  Cancel
                </VBtn>

                <VBtn
                  color="success"
                  @click="isDialogVisible = false"
                >
                  OK
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </template>
      </VListItem>

      <VDivider v-if="index !== profiles.length - 1" />
    </template>
  </VList>
</template>
