<script lang="ts" setup>
import pages3 from '@images/pages/3.png'

interface Props {
  size?: number
  event: any
}

const props = withDefaults(defineProps<Props>(), {
  size: 6,
  event: {

  },
})
</script>

<template>
  <VCol
    :md="props.size"
    cols="12"
  >
    <VCard>
      <VRow no-gutters>
        <VCol
          cols="12"
          sm="8"
          lg="7"
          order="2"
          order-lg="1"
        >
          <VCardItem>
            <VCardTitle>Lifetime Membership</VCardTitle>
            <VCardSubtitle>
              <VIcon
                color="primary"
                icon="mdi-location"
              />
              43-410 Kończyce Małe, ul Szkolna 2
            </VCardSubtitle>
          </VCardItem>

          <VCardText>
            Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men.
          </VCardText>

          <VCardText>
            <VDivider />
          </VCardText>

          <VCardText class="d-flex justify-center">
            <div class="me-auto pe-4">
              <p class="d-flex align-center mb-6">
                <VIcon
                  color="primary"
                  icon="mdi-lock-open-outline"
                />
                <span class="ms-3">Full Access</span>
              </p>

              <p class="d-flex align-center mb-0">
                <VIcon
                  color="primary"
                  icon="mdi-account-outline"
                />
                <span class="ms-3">15 Members</span>
              </p>
            </div>

            <VDivider
              v-if="$vuetify.display.smAndUp"
              vertical
              inset
            />

            <div class="ms-auto ps-4">
              <p class="d-flex align-center mb-6">
                <VIcon
                  color="primary"
                  icon="mdi-star-outline"
                />
                <span class="ms-3">Access all Features</span>
              </p>

              <p class="d-flex align-center mb-0">
                <VIcon
                  color="primary"
                  icon="mdi-trending-up"
                />
                <span class="ms-3">Lifetime Free Update</span>
              </p>
            </div>
          </VCardText>
        </VCol>

        <VCol
          cols="12"
          sm="4"
          lg="5"
          order="1"
          order-lg="2"
          class="member-pricing-bg text-center"
        >
          <div class="d-flex flex-column h-100">
            <VImg
              width="100%"
              :src="pages3"
              cover
            >
              <div class="d-flex h-100 align-end justify-center pb-5">
                <VBtn>
                  Apply Now
                </VBtn>
              </div>
            </VImg>
          </div>
        </VCol>
      </VRow>
    </VCard>
  </VCol>
</template>

<style scoped>

</style>
