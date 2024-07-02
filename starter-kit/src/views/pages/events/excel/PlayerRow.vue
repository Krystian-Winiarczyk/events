<script lang="ts" setup>
import { EXCEL_FIELD_TYPE } from '@/globals/enums/enums'
import type { CompetitionExcelField, UserPet, UserProfile } from '@/globals/types/types'

interface Props {
  excelFieldRow: {
    userProfile: UserProfile
    userPet: UserPet
    excelFields: Array<{ index: number; competitionExcelField: CompetitionExcelField; value: string }>
  } | null
  isView: boolean
  index: number
}

const props = withDefaults(defineProps<Props>(), {
  excelFieldRow: null,
  isView: false,
  index: 0,
})

const emits = defineEmits(['update-excel-field-value'])
</script>

<template>
  <tr v-if="excelFieldRow" :class="{ 'bg-light-primary font-weight-bold': index < 3 && isView }">
    <td class="py-3" v-if="isView">
      <span v-if="index === 0">🥇</span>
      <span v-if="index === 1">🥈</span>
      <span v-if="index === 2">🥉</span>
      {{ index + 1 }}
    </td>
    <td class="py-3">
      <div v-if="isView">
        {{ excelFieldRow.userProfile ? excelFieldRow.userProfile.name : '' }}
      </div>
      <VTextField
        v-else
        density="compact"
        :model-value="excelFieldRow.userProfile ? excelFieldRow.userProfile.name : ''"
        disabled
      />
    </td>
    <td>
      <div v-if="isView">
        {{ excelFieldRow.userPet ? excelFieldRow.userPet.name : '' }}
      </div>
      <VTextField
        v-else
        density="compact"
        :model-value="excelFieldRow.userPet ? excelFieldRow.userPet.name : ''"
        disabled
      />
    </td>
    <td
      v-for="(excelFieldValue, excelFieldValueIndex) in excelFieldRow.excelFields"
      :key="`excel_field_value_${excelFieldValueIndex}_${excelFieldValue.index}`"
    >
      <div v-if="isView">
        {{ (excelFieldValue.value > 9999 ? 'x' : excelFieldValue.value) || 'x' }}
      </div>
      <VTextField
        v-else
        density="compact"
        :model-value="excelFieldValue.value > 9999 ? 0 : excelFieldValue.value"
        :disabled="[
          EXCEL_FIELD_TYPE.SUM,
          EXCEL_FIELD_TYPE.LESS,
          EXCEL_FIELD_TYPE.GREATER,
        ].includes(excelFieldValue.competitionExcelField.type)"
        @blur="emits('update-excel-field-value', { event: $event, excelFieldValue, excelFields: excelFieldRow.excelFields, excelFieldValueIndex })"
      />
      <!--

      -->
    </td>
  </tr>
</template>

<style scoped>

</style>
