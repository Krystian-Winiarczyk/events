<script setup lang="ts">
import ProfileListCard from '@/views/pages/auth/signup/ProfileListCard.vue'

interface Profile {
  firstName: string
  lastName: string
  isPrimary: boolean
}

interface Props {
  profiles: Array<Profile>
}

const props = defineProps<Props>()
const emits = defineEmits(['removeProfile', 'changeProfileField', 'changePrimaryProfile'])

const changeProfileField = (index, { value, key }) => {
  emits('changeProfileField', { index, value, key })
}

const changePrimaryProfile = index => {
  emits('changePrimaryProfile', index)
}

const removeProfile = index => {
  if (props.profiles[index].isPrimary)
    changePrimaryProfile(index ? 0 : 1)

  emits('removeProfile', index)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VSlideGroup show-arrows>
        <VSlideGroupItem
          v-for="(profile, profileIndex) in profiles"
          :key="`profile_${profileIndex}`"
        >
          <ProfileListCard
            class="ma-5"
            style="width: 325px"
            :profile="profile"
            :index="profileIndex"
            @remove-profile="removeProfile(profileIndex)"
            @change-field="changeProfileField(profileIndex, $event)"
            @change-primary-profile="changePrimaryProfile(profileIndex)"
          />
        </VSlideGroupItem>
      </VSlideGroup>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">

</style>
