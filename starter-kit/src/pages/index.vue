<script setup>
</script>

<template>
  <div class="d-flex flex-column gap-5">
    <!--    START::Tob Banner    -->
    <VCard
      style="background: linear-gradient(0deg, #B53D47 0%, #F25260 100%)"
      rounded="lg"
    >
      <VCardItem>
        <VCardTitle>
          Save The Animals!
        </VCardTitle>
      </VCardItem>

      <VCardText class="d-flex flex-column align-start">
        Many animals require our help! See how you can assist them alongside us.

        <VBtn
          rounded="pill"
          class="mt-5"
        >
          Help!

          <VIcon
            end
            icon="mdi-heart"
          />
        </VBtn>
      </vcardtext>
    </VCard>
    <!--    END::Tob Banner    -->

    <VTimeline class="basic-timeline">
      <VTimelineItem
        class="basic-timeline-item"
        small
        left
        inverted
      >
        <template #default>
          <h3 class="title">
            Event Title
          </h3>
          <p>Event description</p>
        </template>
        <template #opposite>
          <p>Event date</p>
        </template>
      </VTimelineItem>

      <VTimelineItem
        class="basic-timeline-item"
        small
        left
        inverted
      >
        <template #default>
          <h3 class="title">
            Another Event
          </h3>
          <p>Another event description</p>
        </template>
        <template #opposite>
          <p>Another event date</p>
        </template>
      </VTimelineItem>
    </VTimeline>
  </div>
</template>
