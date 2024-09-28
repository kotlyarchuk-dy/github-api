<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/20/solid'
import type { Repo } from '@/types'

defineProps<{ repo: Repo }>()
</script>

<template>
  <div class="py-4">
    <div class="mb-1 text-sm text-gray-600">{{ repo.name }}</div>
    <div class="mb-2 text-sm text-gray-500 line-clamp-3">{{ repo.description }}</div>
    <div class="flex flex-row items-center">
      <StarIcon class="h-4 w-4 mr-1 text-indigo-300" aria-hidden="true" />
      <div class="text-sm text-gray-500">{{ repo.starsCount }}</div>
    </div>
  </div>
</template>

<style scoped></style>
