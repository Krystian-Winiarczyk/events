<script setup lang="ts">
import User from '@/globals/objects/root/User'

// The User only changes during the login process
// eslint-disable-next-line vue/no-setup-props-destructure
const { user } = defineProps({
  user: {
    type: User,
    required: true,
  },
})

// Show badge if Profile is User's main profile
const isRootProfile = true

const openLink = url => window.open(url, '_blank')
</script>

<template>
  <div
    class="
      d-flex flex-column align-center gap-4

      flex-md-row
    "
  >
    <div
      class="
        w-100 d-flex flex-column align-center

        flex-md-row
      "
      style="row-gap: 1rem; column-gap: .64rem;"
    >
      <!--    START::Avatar    -->
      <VAvatar
        :image="user.activeProfile.avatar"
        :size="isSM ? '50%' : '2.5rem'"
      />
      <!--    END::Avatar    -->

      <!--    START::Name & Role    -->
      <span
        class="
          d-flex flex-column align-center

          align-md-start
        "
      >
        <p
          class="
            text-h5 text-capitalize font-weight-bold mb-0

            text-md-body-1
          "
        >
          {{ user.activeProfile.name }}

          <VIcon
            v-if="isRootProfile"
            icon="mdi-star-four-points-circle"
            size="18"
            color="success"
          />
        </p>

        <p
          class="
            text-subtitle text-capitalize mb-0

            text-md-subtitle-2
          "
        >
          {{ user.role.name }}
        </p>
      </span>
    <!--    END::Name & Role    -->
    </div>

    <!--    START::Socials Links    -->
    <div
      v-if="user.activeProfile.socials?.length"
      class="d-flex flex-row gap-4"
    >
      <VAvatar
        v-for="social in user.activeProfile.socials"
        :key="social.type"
        :icon="`mdi-${social.type.toLowerCase()}`"
        color="secondary"
        rounded="sm"
        variant="tonal"
        class="cursor-pointer"
        @click="openLink(social.url)"
      />
    </div>
    <!--    END::Socials Links    -->
  </div>
</template>

<style lang="scss" scoped>
#container:before {
  content: '';

  position: absolute;

  width: 100%;
  height: 64vh;

  top : 0;
  left: 0;

  background: var(--fc-code-color);
}
</style>
