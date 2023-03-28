<script lang="ts" setup>
const items = ref([
  {
    id: 1,
    name: 'Catch Party Kończyce Małe',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum eaque ut neque, quia fuga incidunt hic iste harum dolor aliquid vel ullam sunt, dignissimos ab totam fugiat assumenda quam quidem!',
    locationCountry: 'Polska',
    locationCity: 'Kończyce Małe',
    locationPostalCode: '43-410',
    locationStreet: 'Uliczna',
    locationNumber: '2',
    locationDescription: 'Bosika',
    competitions: [{ name: 'Freestyle', level: 2 }],
  },
  {
    id: 2,
    name: 'Catch Party Kończyce Małe',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum eaque ut neque, quia fuga incidunt hic iste harum dolor aliquid vel ullam sunt, dignissimos ab totam fugiat assumenda quam quidem!',
    locationCountry: 'Polska',
    locationCity: 'Kończyce Małe',
    locationPostalCode: '43-410',
    locationStreet: 'Uliczna',
    locationNumber: '2',
    locationDescription: 'Bosika',
    competitions: [{ name: 'Agility', level: 1 }],
  },
  {
    id: 3,
    name: 'Catch Party Zebrzydowice',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum eaque ut neque, quia fuga incidunt hic iste harum dolor aliquid vel ullam sunt, dignissimos ab totam fugiat assumenda quam quidem!',
    locationCountry: 'Polska',
    locationCity: 'Zebrzydowice',
    locationPostalCode: '43-410',
    locationStreet: 'Uliczna',
    locationNumber: '2',
    locationDescription: 'Boisko obok szkoły',
    competitions: [{ name: 'Agility', level: 1 }, { name: 'Freestyle', level: 2 }],
  },
])

const loading = ref(false)
</script>

<template>
  <div>
    <VRow>
      <VCol
        v-for="item in items"
        :key="item.name"
        cols="12"
        md="6"
      >
        <VCard>
          <VCardItem>
            <VCardTitle>
              <div class="d-flex justify-space-between">
                <div>
                  {{ item.name }}
                </div>
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                >
                  <VIcon
                    size="20"
                    icon="tabler-star"
                    class="text-disabled"
                  />
                </VBtn>
              </div>
            </VCardTitle>
          </VCardItem>
          <div class="d-flex flex-column-reverse flex-md-row mt-n8">
            <div>
              <VCardText class="d-flex align-center flex-wrap text-body-1">
                <VChip
                  v-for="(competition, index) in item.competitions"
                  :key="`competition_${item.name}_${index}`"
                  label
                  color="primary"
                  size="small"
                  class="font-weight-medium me-2"
                >
                  {{ competition.name }}
                  <VIcon
                    v-for="star in (new Array(competition.level).fill(null))"
                    :key="`competition_${item.name}_${index}_${star}`"
                    class="ml-1"
                    size="13"
                    icon="tabler-star"
                  />
                </VChip>
              </VCardText>

              <VCardText>
                {{ item.description }}
              </VCardText>

              <VCardText>
                <div class="v-avatar-group">
                  <VAvatar size="32">
                    <VImg src="/src/assets/images/avatars/avatar-1.png" />

                    <VTooltip
                      activator="parent"
                      location="top"
                    >
                      Tester
                    </VTooltip>
                  </VAvatar>
                </div>
              </VCardText>
            </div>

            <div class="ma-auto pa-5">
              <VImg
                cover
                :width="180"
                style="height: 180px;"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJDCGIyvX7XpEPYC4IQZKCiignPjsmWlUtuzd7k88XIZXolYYVAmIdjiPrwF8xl_TmZY&usqp=CAU"
                class="rounded"
              />
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
