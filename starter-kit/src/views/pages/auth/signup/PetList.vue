<script setup lang="ts">
import PetListCard from '@/views/pages/auth/signup/PetListCard.vue'

interface UserPet {
  name: string
  description: string
  iamge: any
}

interface Props {
  pets: Array<Pet>
}

const props = defineProps<Props>()
const emits = defineEmits(['removePet', 'changePetField'])

const changePetField = (index, { value, key }) => {
  emits('changePetField', { index, value, key })
}

const removePet = index => {
  emits('removePet', index)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VSlideGroup show-arrows>
        <VSlideGroupItem
          v-for="(pet, petIndex) in pets"
          :key="`profile_${petIndex}`"
        >
          <PetListCard
            class="ma-5"
            style="width: 425px"
            :pet="pet"
            :index="petIndex"
            @remove-pet="removePet(petIndex)"
            @change-field="changePetField(petIndex, $event)"
          />
        </VSlideGroupItem>
      </VSlideGroup>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">

</style>
