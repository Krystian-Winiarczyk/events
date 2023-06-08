<script setup lang="ts">
const socials = [
  {
    type: 'FACEBOOK',
    href: 'https://www.facebook.com/',
  },
  {
    type: 'LINKEDIN',
    href: 'https://www.linkedin.com/',
  },
  {
    type: 'INSTAGRAM',
    href: 'https://www.instagram.com/',
  },
]
</script>

<template>
  <!--    START::Socials    -->
  <div class="d-flex flex-column gap-2">
    <label class="font-p">Socials</label>

    <VList
      lines="two"
      rounded
      variant="plain"
      density="comfortable"
    >
      <template
        v-for="(social, key) in socials"
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
            <VIcon icon="mdi-plus" />
          </template>
        </VListItem>

        <VDivider v-if="key !== socials.length - 1" />
      </template>
    </VList>
  </div>
  <!--    END::Socials    -->

  <!--    START::Socials    -->
  <div class="d-flex flex-column gap-2">
    <label class="font-p">Socials</label>

    <VList
      lines="two"
      rounded
      variant="plain"
      density="comfortable"
    >
      <template
        v-for="(social, key) in socials"
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
            <VIcon icon="mdi-plus" />
          </template>
        </VListItem>

        <VDivider v-if="key !== socials.length - 1" />
      </template>
    </VList>
  </div>
  <!--    END::Socials    -->
</template>
