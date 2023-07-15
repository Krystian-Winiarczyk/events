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

    <VTimeline
      side="end"
      align="start"
      line-inset="8"
      truncate-line="both"
      density="compact"
    >
      <VTimelineItem
        v-for="i in 10"
        :key="i"
        dot-color="error"
        size="x-small"
      >
        <!-- 👉 Header -->
        <VImg
          src="https://cdn.pixabay.com/photo/2018/01/05/19/20/tree-3063715_960_720.jpg"
          class="w-100 rounded shadow mb-2"
        />

        <!-- 👉 Content -->
        <p class="app-timeline-text mb-1">
          <span>You have to balance, and receive faith by your failing. Suffering is the only satori, the only guarantee of extend.</span>
        </p>

        <p class="app-timeline-meta">
          Jun 15, 2015 6:30 AM
        </p>
      </VTimelineItem>
    </VTimeline>
  </div>
</template>
