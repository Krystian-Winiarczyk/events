<script setup lang="ts">
import User from '@/globals/objects/root/User'

defineProps({
  user: {
    type: User,
    required: true,
  },
})
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <!--    START::About    -->
    <div class="d-flex flex-column">
      <label
        class="font-p sticky-label"
        :style="isSM ? 'top: 4rem' : 'top: 4rem'"
      >
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
          title="My Name"
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
          title="My Pets"
          @click="$router.push({ path: '/pets' })"
        >
          <template #prepend>
            <VIcon icon="mdi-paw" />
          </template>

          <template #append>
            <VIcon icon="mdi-chevron-right" />
          </template>
        </VListItem>

        <VDivider />

        <VListItem
          :value="user.name"
          title="My Firends"
        >
          <template #prepend>
            <VIcon icon="mdi-users" />
          </template>

          <template #append>
            <VIcon icon="mdi-chevron-right" />
          </template>
        </VListItem>

        <VDivider />

        <VListItem
          :value="user.name"
          title="My Events"
        >
          <template #prepend>
            <VIcon icon="mdi-event" />
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
      <label
        class="font-p sticky-label"
        :style="isSM ? 'top: 4rem' : 'top: 4rem'"
      >
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
      <label
        class="font-p sticky-label"
        :style="isSM ? 'top: 4rem' : 'top: 4rem'"
      >
        Security
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <VListItem
          title="My Password"
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
          title="My Email"
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
      <label
        class="font-p sticky-label"
        :style="isSM ? 'top: 4rem' : 'top: 4rem'"
      >
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

        <VListItem title="Give My Data">
          <template #prepend>
            <VIcon icon="mdi-document" />
          </template>
        </VListItem>

        <VDivider />

        <VListItem title="Delete My Account">
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

  padding: .5rem 1rem;

  background: #1E1A1E;

  z-index: 10;
}
</style>
