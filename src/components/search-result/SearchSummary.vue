<script setup lang="ts">
import { computed } from 'vue'
import { GithubService } from '@/services/github'
import { formatDate } from '@/utils/date'

const { fromDate, toDate, minStars } = GithubService.getLastUsedFilters()!
const dateRangePhrase = computed(() => {
  if (fromDate && toDate) {
    return `between ${formatDate(fromDate)} and ${formatDate(toDate)}`
  } else if (fromDate) {
    return `after ${formatDate(fromDate)}`
  } else if (toDate) {
    return `before ${formatDate(toDate)}`
  } else {
    return ''
  }
})

const minStarsPhrase = computed(() => {
  return `with at least ${minStars} stars`
})
</script>

<template>
  <div
    class="flex flex-col w-full p-5 bg-slate-100 rounded-lg shadow text-sm font-medium text-gray-900"
  >
    <div class="mb-1">Github repositories</div>
    <div class="mb-1">{{ dateRangePhrase }}</div>
    <div>{{ minStarsPhrase }}</div>
  </div>
</template>

<style scoped></style>
