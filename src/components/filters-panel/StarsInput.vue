<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()

const onMinStarsChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  let minStars = Number(target.value)
  if (isNaN(minStars) || minStars <= 0) {
    minStars = 0
    target.value = '0'
  }
  filtersStore.setMinStars(minStars)
}
</script>

<template>
  <div class="flex flex-row mb-5 items-center">
    <div class="mr-2 text-sm text-gray-600">With at least</div>
    <input
      type="number"
      :value="filtersStore.minStars ?? ''"
      @input="onMinStarsChange"
      class="input w-24"
      placeholder="0"
      min="0"
    />
    <div class="ml-2 text-sm text-gray-600">stars</div>
  </div>
</template>

<style scoped></style>
