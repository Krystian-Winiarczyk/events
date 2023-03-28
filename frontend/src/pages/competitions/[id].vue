<script lang="ts" setup>
const route = useRoute()

const isEditMode = computed(() => {
  return route.params.id !== 'new'
})
</script>

<template>
  <div>
    <div class="mb-2">
        <VBtn
        color="secondary"
        class="mr-2"
        size="small"
        to="/competitions"
      >
        <VIcon
          size="22"
          icon="tabler-arrow-back-up"
        />
        Back
      </VBtn>
      <VBtn
        color="primary"
        size="small"
        to="/competitions/new"
      >
        <VIcon
          size="22"
          icon="tabler-device-floppy"
        />
        Save
      </VBtn>
    </div>
    <VCard>
      <VCardItem>
        <VRow class="gap-y-4">
          <!-- Name -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              id="outlined-basic"
              label="Name"
            />
          </VCol>
          <!-- Regulations url -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              id="outlined-basic"
              label="Regulations"
            />
          </VCol>
          <!-- Description -->
          <VCol
            cols="12"
          >
            <VTextarea
              id="outlined-basic"
              label="Description"
            />
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </div>
</template>
