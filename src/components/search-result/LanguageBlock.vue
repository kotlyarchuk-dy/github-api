<script setup lang="ts">
import { computed } from 'vue'
import { useReposStore } from '@/stores/repos'
import RepoItem from './RepoItem.vue'
import type { Lang } from '@/types'

const reposStore = useReposStore()
const props = defineProps<{ language: Lang }>()

const repos = computed(() => reposStore.reposByLanguage(props.language))
</script>

<template>
  <div
    class="h-[400px] w-80 p-5 bg-slate-100 divide-y divide-gray-200 overflow-y-auto rounded-lg shadow"
  >
    <div class="mb-5 text-sm font-medium text-gray-900">{{ language }}</div>
    <RepoItem v-for="repo in repos" :repo="repo" :key="repo.id" />
  </div>
</template>

<style scoped></style>
