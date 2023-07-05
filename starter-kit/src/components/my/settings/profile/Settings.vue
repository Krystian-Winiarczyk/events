<script setup lang="ts">
import {User} from "@/globals/types/types";

interface Props {
  user: User
}

const props = defineProps<Props>()

const primaryProfile = computed(() => {
  return props.user?.primaryProfile || null
})

// const socialList = Object.values(SOCIAL_LINK)
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <!--    START::About    -->
    <div class="d-flex flex-column">
      <label
        class="font-p sticky-label"
        :style="isSM ? 'top: 4rem' : 'top: 4rem'"
      >
        {{ $t('AboutMe') }}
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <VListItem
          :value="user.name"
          :title="$t('MyName')"
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
          :title="$t('MyProfiles')"
          @click="$router.push({ path: '/my/profiles' })"
        >
          <template #prepend>
            <VAvatar
              :image="user.profiles[0].avatar"
              size="20"
            />
          </template>

          <template #append>
            <VIcon icon="mdi-chevron-right" />
          </template>
        </VListItem>

        <VDivider />

<!--        <VListItem-->
<!--          :value="my.name"-->
<!--          title="My Firends"-->
<!--          @click="$router.push({ path: '/my/friends' })"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <VIcon icon="mdi-users" />-->
<!--          </template>-->

<!--          <template #append>-->
<!--            <VIcon icon="mdi-chevron-right" />-->
<!--          </template>-->
<!--        </VListItem>-->
<!--        <VDivider />-->

        <VListItem
          :value="user.name"
          :title="$t('MyPupils')"
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
          :title="$t('MyEvents')"
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
        {{ $t('Socials') }}
      </label>

<!--      <VList-->
<!--        lines="two"-->
<!--        rounded-->
<!--        variant="plain"-->
<!--        density="comfortable"-->
<!--      >-->
<!--        <template-->
<!--          v-for="(social, i) in socialList"-->
<!--          :key="i"-->
<!--        >-->
<!--          <VListItem-->
<!--            :value="social"-->
<!--            :title="social"-->
<!--            :subtitle="my.activeProfile.socials.find(item => item.type.toLowerCase() === social.toLowerCase())?.url.split('/')[3]"-->
<!--          >-->
<!--            <template #prepend>-->
<!--              <VIcon :icon="`mdi-${social.toLowerCase()}`" />-->
<!--            </template>-->

<!--            <template #append>-->
<!--              <VIcon-->
<!--                icon="mdi-edit"-->
<!--                size="18"-->
<!--              />-->
<!--            </template>-->
<!--          </VListItem>-->

<!--          <VDivider v-if="i !== socialList.length - 1" />-->
<!--        </template>-->
<!--      </VList>-->
    </div>
    <!--    END::Socials    -->

    <!--    START::Security    -->
    <div class="d-flex flex-column">
      <label
        class="font-p sticky-label"
        :style="isSM ? 'top: 4rem' : 'top: 4rem'"
      >
        {{ $t('Security') }}
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <VListItem
          :title="$t('MyPassword')"
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
          :title="$t('MyEmail')"
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
        {{ $t('Support') }}
      </label>

      <VList
        lines="two"
        rounded
        variant="plain"
        density="comfortable"
      >
        <VListItem :title="$t('HelpMe')">
          <template #prepend>
            <VIcon icon="mdi-help" />
          </template>
        </VListItem>

        <VDivider />

<!--        <VListItem title="Give My Data">-->
<!--          <template #prepend>-->
<!--            <VIcon icon="mdi-document" />-->
<!--          </template>-->
<!--        </VListItem>-->
<!--        <VDivider />-->

        <VListItem :title="$t('DeleteMyAccount')">
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
