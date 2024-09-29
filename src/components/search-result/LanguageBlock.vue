<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReposStore } from '@/stores/repos'
import { GithubService } from '@/services/github'
import RepoItem from './RepoItem.vue'
import ScrollObserver from './ScrollObserver.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import EmptyLanguageState from './EmptyLanguageState.vue'
import type { Lang } from '@/types'

const reposStore = useReposStore()
const props = defineProps<{ language: Lang }>()

const repos = computed(() => reposStore.reposByLanguage(props.language))
const isEmpty = computed(() => repos.value?.length === 0)

const isLoading = ref(false)
const hasNextPage = () => {
  return GithubService.hasNextPage(props.language)
}
const onScrollEnd = async () => {
  isLoading.value = true
  await GithubService.fetchMoreRepos(props.language)
  isLoading.value = false
}
</script>

<template>
  <div class="relative flex flex-col h-[400px] w-80 bg-slate-100 rounded-lg shadow">
    <div class="p-5 text-sm font-medium text-gray-900 border-b border-b-gray-200">
      {{ language }}
    </div>
    <EmptyLanguageState v-if="isEmpty" />
    <div v-else class="max-h-[calc(100%-60px)] px-5 overflow-y-auto divide-y divide-gray-200">
      <RepoItem v-for="repo in repos" :repo="repo" :key="repo.id" />
      <ScrollObserver v-if="hasNextPage()" @intersect="onScrollEnd" />
    </div>
    <div v-if="isLoading" role="status" class="absolute top-2 right-5 border-none">
      <BaseSpinner />
    </div>
  </div>
</template>

<style scoped></style>
