<script setup lang="ts">
import type { Ref } from 'vue'
import type { Group } from '@/globals/types/types'
import axiosIns from '@axios'

import { useToastStore } from '@/store/toast'
import { defaultGroup } from '@/globals/defaults'
import SettingsGroupFormCard from '@/views/forms/components/SettingsGroupFormCard.vue'

const props = defineProps<Props>()

const emits = defineEmits(['close'])

interface Props {
  defaultGroup?: Group
}

const { showMessage } = useToastStore()

const groups: Ref<Group[]> = ref([{ ...defaultGroup }])
const loading = ref(false)

const addGroup = () => {
  groups.value.push({ ...defaultGroup })
}

const onSubmit = async () => {
  loading.value = true

  const items = await Promise.all([...groups.value].map(async (group: Group) => {
    return JSON.parse(JSON.stringify(group))
  }))

  setTimeout(async () => {
    try {
      let resp = null
      if (items[0].id)
        resp = await axiosIns.patch(`settings/groups/${items[0].id}`, items[0])

      else
        resp = await axiosIns.post('settings/groups', items)

      const updatedItem = resp?.data?.items

      showMessage('success', 'snackbar.GroupChangesSaved', 'snackbar.ChangesSaved')

      emits('close', updatedItem)
    }
    catch (err) {
      showMessage('error', 'snackbar.AnErrorOccurredWhileUpdatingGroup', 'snackbar.ProblemEncountered')
    }
    finally {
      loading.value = false
    }
  }, 1000)
}

const removeGroup = (index: number) => {
  groups.value.splice(index, 1)
}

onMounted(() => {
  if (props.defaultGroup)
    Object.assign(groups.value[0], JSON.parse(JSON.stringify(props.defaultGroup)))
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
          {{ $t(groups[0].id ? 'EditGroup' : 'CreateNewGroups') }}
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
    <VForm class="pet-form mx-5 py-4">
      <VRow>
        <VCol
          v-for="(group, groupIndex) in groups"
          :key="`group_${groupIndex}`"
          sm="12"
        >
          <SettingsGroupFormCard
            :group.async="group"
            :show-delete="groupIndex !== 0"
            @remove-item="removeGroup(groupIndex)"
          />
        </VCol>
      </VRow>

      <VRow v-if="!groups[0].id">
        <VCol sm="12">
          <div class="d-flex align-center justify-center">
            <VBtn
              icon="mdi-plus"
              @click="addGroup"
            />
          </div>
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
