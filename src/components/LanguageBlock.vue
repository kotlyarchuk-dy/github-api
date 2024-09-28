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
  <div class="h-72 w-60 overflow-y-auto border border-slate-400 rounded-lg p-5">
    <div class="mb-5">{{ language }}</div>
    <RepoItem v-for="repo in repos" :repo="repo" :key="repo.id" />
  </div>
</template>

<style scoped></style>
