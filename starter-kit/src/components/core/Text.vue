<script lang="ts" setup>
import { isNumber } from '@core/utils'
import {RouteMeta} from "vue-router";

interface Props {
  value: any
  prefix?: any
  defaultValue?: any
  to?: any
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: null,
  to: null,
})
</script>

<template>
  <span>
    <span v-if="isNumber(value)">
      <Component :is="to ? 'RouterLink' : 'span'" :to="to">
        {{ value }} <span v-if="prefix">{{ prefix }}</span>
      </Component>
    </span>
    <span v-else-if="value">
      <Component :is="to ? 'RouterLink' : 'span'" :to="to">
        {{ value }} <span v-if="prefix">{{ prefix }}</span>
      </Component>
    </span>
    <span v-else-if="defaultValue">
      {{ defaultValue }}
    </span>
    <VIcon
      v-else
      icon="mdi-minus"
    />
  </span>
</template>

<style scoped>

</style>
