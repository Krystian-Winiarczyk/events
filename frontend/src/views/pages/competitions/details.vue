<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: null,
    required: true,
  },
})
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
                    disabled
              id="outlined-basic"
              :label="$t('Name')"
              v-model="item.name"
            />
          </VCol>
          <!-- Regulations url -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
                disabled
              id="outlined-basic"
              :label="$t('Regulations')"
              v-model="item.regulationUrl"
            />
          </VCol>
          <!-- Description -->
          <VCol
            cols="12"
          >
            <VTextarea
                disabled
              id="outlined-basic"
              :label="$t('Description')"
              v-model="item.description"
            />
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>

    <!-- Competitions -->
    <VCard />
  </div>
</template>
