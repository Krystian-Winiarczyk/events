<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps({
  item: {
    type: Object,
    default: null,
    required: true,
  },
})

const emits = defineEmits(['removeLevelItem'])

const { t } = useI18n()

const addCompetitionLevel = (): void => {
  const newLevelNumber = props.item.competitionLevels.length + 1

  // eslint-disable-next-line vue/no-mutating-props
  props.item.competitionLevels.push({
    name: `${t('Level')} ${newLevelNumber}`,
  })
}

const removeCompetitionLevel = (level: any, index: number): void => {
  emits('removeLevelItem', level, index)
}
</script>

<template>
  <div v-if="item">
    <VCard>
      <VCardItem>
        <VRow class="gap-y-4 pt-2">
          <!-- Name -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              id="outlined-basic"
              v-model="item.name"
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
              :label="$t('Description')"
            />
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>

    <div class="d-flex mt-5 align-center">
      <h3>
        {{ $t('CompetitionLevels') }}
      </h3>
      <VBtn
        size="x-small"
        class="ml-2"
        @click="addCompetitionLevel"
      >
        <VIcon
          icon="tabler-plus"
          size="20"
        />
        {{ $t('Add') }}
      </VBtn>
    </div>

    <!-- Competitions -->
    <VRow class="mt-1 disable-card-overflow">
      <VCol
        v-for="(competitionLevel, index) in item.competitionLevels"
        :key="`competitionLevel_${index}`"
        cols="4"
      >
        <VCard>
          <VBtn
            size="x-small"
            color="error"
            class="delete-button"
            @click="removeCompetitionLevel(competitionLevel, index)"
          >
            <VIcon
              icon="tabler-trash"
              size="18"
            />
          </VBtn>

          <VCardItem>
            <VRow class="gap-y-4 pt-2">
              <!-- Name -->
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  id="outlined-basic"
                  v-model="competitionLevel.name"
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
                  v-model="competitionLevel.regulationUrl"
                  :label="$t('Regulations')"
                />
              </VCol>
              <!-- Description -->
              <VCol
                cols="12"
              >
                <VTextarea
                  id="outlined-basic"
                  v-model="competitionLevel.description"
                  :label="$t('Description')"
                />
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
    .delete-button {
        position: absolute;
        top: -10px;
        right: 10px;
    }
</style>
