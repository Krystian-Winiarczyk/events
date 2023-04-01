<script setup lang="ts">
import EmptyContent from '@/views/utils/empty-content.vue'

const props = defineProps({
  item: {
    type: Object,
    default: null,
    required: true,
  },
})

const emits = defineEmits(['removeLevelItem'])

const removeCompetitionLevel = (level: any, index: number): void => {
  emits('removeLevelItem', level, index)
}
</script>

<template>
  <div v-if="item">
    <VCard>
      <VCardItem>
        <VRow class="gap-y-4 pt-1">
          <!-- Name -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              id="outlined-basic"
              v-model="item.name"
              disabled
              :label="$t('Name')"
            />
          </VCol>
          <!-- Regulations url -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              id="outlined-basic"
              v-model="item.regulationUrl"
              disabled
              :label="$t('Regulations')"
            />
          </VCol>
          <!-- Description -->
          <VCol
            cols="12"
          >
            <VTextarea
              id="outlined-basic"
              v-model="item.description"
              disabled
              :label="$t('Description')"
            />
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>

    <VRow class="mt-1">
      <VCol
        v-for="(competitionLevel, index) in item.competitionLevels"
        :key="`competitionLevel_${index}`"
        cols="4"
      >
        <VCard>
          <VCardTitle>
            <div class="d-flex justify-space-between">
              {{ competitionLevel.name }}

              <VTooltip
                v-if="competitionLevel.regulationUrl"
                location="top"
                :text="competitionLevel.regulationUrl"
              >
                <template #activator="{ props }">
                  <VIcon
                    v-bind="props"
                    size="20"
                    icon="tabler-link"
                  />
                </template>
              </VTooltip>
              <VIcon
                size="20"
                icon="tabler-trash"
                class="ml-1"
                @click="removeCompetitionLevel(competitionLevel, index)"
              />
            </div>
          </VCardTitle>

          <VCardText v-if="competitionLevel.description">
            {{ competitionLevel.description }}
          </VCardText>
          <EmptyContent
            v-else
            :message="$t('EmptyDescription')"
          />
        </VCard>
      </VCol>
    </VRow>

    <!-- Competitions -->
    <VCard />
  </div>
</template>
