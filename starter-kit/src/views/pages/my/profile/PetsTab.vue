<script setup lang="ts">
import type { UserPet } from '@/globals/types/types'

interface Props {
  pets: UserPet[]
}

const props = withDefaults(defineProps<Props>(), {
  pets: () => [],
})

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Munchkin_cat_2.jpg/800px-Munchkin_cat_2.jpg',
  'https://zloteprzeboje.pl/wp-content/uploads/2022/09/EN_01099887_5551.jpg',
  'https://i.ytimg.com/vi/W04bdiz7shs/maxresdefault.jpg',
]
</script>

<template>
  <VRow>
    <VCol
      v-for="(pet, petIndex) in pets"
      :key="`pet_${pet.name}`"
      sm="12"
      md="6"
    >
      <VCard
        class="d-flex flex-column justify-end"
        rounded="lg"
        :image="images[petIndex]"
        height="300"
      >
        <div class="position-absolute d-flex gap-1" style="top: 5px; right: 10px">
          <div>
            <VChip v-if="pet.weight" size="small" color="primary" variant="elevated">
              <VIcon icon="mdi-weight" size="14" />
              {{ pet.weight }} kg
            </VChip>
            <VTooltip
              activator="parent"
              location="top"
            >
              Waga
            </VTooltip>
          </div>

          <!-- Height -->
          <div>
            <VChip v-if="pet.height" size="small" color="primary" variant="elevated">
              <VIcon icon="mdi-weight" />
              {{ pet.height }}
            </VChip>
            <VTooltip
              activator="parent"
              location="top"
            >
              {{ $t('HeightAtTheWithers') }}
            </VTooltip>
          </div>
        </div>
        <!--    START::Content    -->
        <div
          class="px-4 py-3 d-flex flex-row align-center justify-space-between gap-2"
          style="background: rgba(var(--v-theme-surface), 1)"
        >
          <!--    START::Owner Name & UserPet Name    -->
          <div class="d-flex flex-column">
            <p class="text-h6 mb-0">
              {{ pet.name }}
            </p>
            <small>
              <VIcon icon="mdi-book" />
              {{ pet.passportNumber }}

              <VTooltip
                activator="parent"
                location="top"
              >
                {{ $t('PassportNumber') }}
              </VTooltip>
            </small>
          </div>
          <!--    END::Owner Name & UserPet Name    -->

          <VIcon
            icon="mdi-gender-male"
            size="34"
          />
        </div>
        <!--    END::Content    -->
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>

</style>
