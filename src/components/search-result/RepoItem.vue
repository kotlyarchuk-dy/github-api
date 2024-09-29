<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/20/solid'
import type { Repo } from '@/types'

defineProps<{ repo: Repo }>()
</script>

<template>
  <a :href="repo.url" target="_blank" class="group block py-4">
    <div class="mb-1 text-sm text-gray-600 group-hover:text-gray-900">{{ repo.name }}</div>
    <div class="mb-2 text-sm text-gray-500 group-hover:text-gray-800 line-clamp-2">
      {{ repo.description }}
    </div>
    <div class="flex flex-row items-center">
      <StarIcon
        class="h-4 w-4 mr-1 text-indigo-300 group-hover:text-indigo-500"
        aria-hidden="true"
      />
      <div class="text-sm text-gray-500 group-hover:text-gray-800">{{ repo.starsCount }}</div>
    </div>
  </a>
</template>

<style scoped></style>
