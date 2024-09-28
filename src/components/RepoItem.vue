<script setup lang="ts">
import type { Repo } from '@/types'

defineProps<{ repo: Repo }>()
</script>

<template>
  <div class="mb-3">
    <div class="mb-1 font-semibold">{{ repo.name }}</div>
    <div class="mb-1 line-clamp-3">{{ repo.description }}</div>
    <div>{{ repo.starsCount }}</div>
  </div>
</template>

<style scoped></style>
