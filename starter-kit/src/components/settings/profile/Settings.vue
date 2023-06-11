<script setup lang="ts">
import type { User } from '@/types/types'

defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <!--    START::About    -->
    <div class="d-flex flex-column">
      <label class="font-p sticky-label">
        About
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <VListItem
          :value="user.name"
          title="Your Name"
          :subtitle="user.name"
        >
          <template #prepend>
            <VIcon icon="mdi-user" />
          </template>

          <template #append>
            <VIcon
              icon="mdi-edit"
              size="18"
            />
          </template>
        </VListItem>

        <VDivider />

        <VListItem
          :value="user.name"
          title="Your's Pets"
        >
          <template #prepend>
            <VIcon icon="mdi-paw" />
          </template>

          <template #append>
            <VIcon icon="mdi-chevron-right" />
          </template>
        </VListItem>
      </VList>
    </div>
    <!--    END::About    -->

    <!--    START::Socials    -->
    <div class="d-flex flex-column">
      <label class="font-p sticky-label">
        Socials
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <template
          v-for="(social, key) in user.socials"
          :key="key"
        >
          <VListItem
            :value="social.type"
            :title="social.type.toLowerCase()"
            :subtitle="social.href"
          >
            <template #prepend>
              <VIcon :icon="`mdi-${social.type.toLowerCase()}`" />
            </template>

            <template #append>
              <VIcon
                icon="mdi-edit"
                size="18"
              />
            </template>
          </VListItem>

          <VDivider v-if="key !== user.socials.length - 1" />
        </template>
      </VList>
    </div>
    <!--    END::Socials    -->

    <!--    START::Security    -->
    <div class="d-flex flex-column">
      <label class="font-p sticky-label">
        Security
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <VListItem
          title="Your Password"
          subtitle="******"
        >
          <template #prepend>
            <VIcon icon="mdi-password" />
          </template>

          <template #append>
            <VIcon
              icon="mdi-edit"
              size="18"
            />
          </template>
        </VListItem>

        <VDivider />

        <VListItem
          title="Your Email"
          :subtitle="user.email"
        >
          <template #prepend>
            <VIcon icon="mdi-email" />
          </template>

          <template #append>
            <VIcon
              icon="mdi-edit"
              size="18"
            />
          </template>
        </VListItem>
      </VList>
    </div>
    <!--    END::Security    -->

    <!--    START::Support    -->
    <div class="d-flex flex-column">
      <label class="font-p sticky-label">
        Support
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <VListItem title="Help Me">
          <template #prepend>
            <VIcon icon="mdi-help" />
          </template>
        </VListItem>

        <VDivider />

        <VListItem title="Delete Your Account">
          <template #prepend>
            <VIcon icon="mdi-trash" />
          </template>
        </VListItem>
      </VList>
    </div>
    <!--    END::Support    -->
  </div>
</template>

<style lang="scss" scoped>
.sticky-label {
  position: sticky;

  top: 4rem;

  padding: .5rem 1rem;

  background: #1E1A1E;

  z-index: 10;
}
</style>
