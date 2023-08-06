<script setup lang="ts">
import type { Ref } from 'vue'
import type { Sponsor } from '@/globals/types/types'
import axiosIns from '@axios'

import { useToastStore } from '@/store/toast'
import { defaultSponsor } from '@/globals/defaults'
import SettingsSponsorFormCard from '@/views/forms/components/SettingsSponsorFormCard.vue'

const props = defineProps<Props>()

const emits = defineEmits(['close'])

interface Props {
  defaultSponsor?: Sponsor
}

const { showMessage } = useToastStore()

const sponsors: Ref<Sponsor[]> = ref([{ ...defaultSponsor }])
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true

  const item = { ...sponsors.value }

  setTimeout(async () => {
    try {
      let resp = null
      if (item?.id)
        resp = await axiosIns.patch(`settings/sponsors/${item.id}`, item)

      else
        resp = await axiosIns.post('settings/sponsors', item)

      const [updatedItem] = resp?.data?.items

      showMessage('success', 'snackbar.SponsorChangesSaved', 'snackbar.ChangesSaved')

      emits('close', updatedItem)
    }
    catch (err) {
      showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingSponsor', 'snackbar.ProblemEncountered')
    }
    finally {
      loading.value = false
    }
  }, 1000)
}

onMounted(() => {
  if (props.defaultSponsor)
    Object.assign(sponsors.value[0], JSON.parse(JSON.stringify(props.defaultSponsor)))
})
</script>

<template>
  <div>
    <div>
      <VToolbar color="primary">
        <VBtn
          icon
          variant="plain"
          @click="$emit('close')"
        >
          <VIcon
            color="white"
            icon="mdi-close"
          />
        </VBtn>

        <VToolbarTitle>
          {{ $t(sponsors[0].id ? 'EditSponsor' : 'CreateNewSponsors') }}
        </VToolbarTitle>

        <VSpacer />

        <VToolbarItems>
          <VBtn
            variant="text"
            :loading="loading"
            @click="onSubmit"
          >
            {{ $t('Save') }}
          </VBtn>
        </VToolbarItems>
      </VToolbar>
    </div>
    <VForm class="pet-form mx-10">
      <SettingsSponsorFormCard
        v-for="(sponsor, sponsorIndex) in sponsors"
        :key="`sponsor_${sponsorIndex}`"
        :sponsor.async="sponsor"
      />


        <VRow v-if="!sponsors[0].id">
          <VCol sm="12">
            123
          </VCol>
        </VRow>
    </VForm>
  </div>
</template>

<style lang="scss">
.pet-form {
  & .pt-0 {
    .v-field__input {
      padding-top: 0 !important;
    }

    .v-input__details {
      margin-top: -20px !important;
    }
  }

  .v-list-item {
    min-height: 32px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .hover-next {
    .display-image {
      transition: all .25s;
    }

    &:hover .display-image {
      opacity: 1 !important;
    }
  }
}
</style>
