<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()

const onFromDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  filtersStore.setFromDate(target.value)
}

const onToDateChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  filtersStore.setToDate(target.value)
}
</script>

<template>
  <div class="flex flex-row items-center mb-2">
    <div class="inline-block w-10 text-sm text-gray-600">From</div>
    <input type="date" @change="onFromDateChange" class="input" data-test-id="fromDate" />
  </div>
  <div class="flex flex-row items-center">
    <div class="inline-block w-10 text-sm text-gray-600">To</div>
    <input type="date" @change="onToDateChange" class="input" data-test-id="toDate" />
  </div>
</template>

<style scoped></style>
