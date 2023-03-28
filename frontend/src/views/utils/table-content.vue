<script setup lang="ts">
interface Header {
  key: string
  label: string
  visible?: boolean
}

const props = defineProps({
  items: { default: () => [], type: Array, required: true },
  headers: { default: () => [], type: Array, required: true },
})

const tableId = (Math.random() + 1).toString(36).substring(7)

const visibleHeaders = computed(() => {
  return props.headers
})
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th
          v-for="(header, index) in visibleHeaders"
          :key="`table_${tableId}_header_${index}`"
          class="text-left"
        >
          <slot
            v-if="$slots[`header(${header.key})`]"
            :name="`header(${header.key})`"
            :header="header"
          >
            {{ header.label }}
          </slot>
          <slot
            v-if="$slots[`header()`]"
            name="header()"
            :header="header"
          >
            {{ header.label }}
          </slot>
          <span v-else>
            {{ header.label }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, itemIndex) in items"
        :key="`table_${tableId}_item_${itemIndex}`"
      >
        <td
          v-for="(header, itemHeaderIndex) in visibleHeaders"
          :key="`table_${tableId}_item_${itemIndex}_cell_${itemHeaderIndex}`"
        >
          <slot
            v-if="$slots[`cell(${header.key})`]"
            :name="`cell(${header.key})`"
            :item="item"
            :header="header"
            :index="itemIndex"
            :value="item[header.key]"
          >
            {{ item[header.key] }}
          </slot>
          <slot
            v-else-if="$slots[`cell()`]"
            name="cell()"
            :item="item"
            :header="header"
            :index="itemIndex"
          >
            {{ item[header.key] }}
          </slot>
          <span v-else>
            {{ item[header.key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<style scoped>

</style>
