<script setup lang="ts">
import { GithubService } from '@/services/github'
import { useReposStore } from '@/stores/repos'

const reposStore = useReposStore()

const onSearchClick = async () => {
  await GithubService.searchByLanguageList(['C', 'JavaScript', 'Python', 'Kotlin', 'PHP'])
}
</script>

<template>
  <div class="w-full h-full flex content-stretch">
    <div class="left w-80 flex-shrink-0 bg-slate-100">
      <div>Filters</div>
      <button @click="onSearchClick">Search</button>
    </div>
    <div class="flex-grow overflow-auto">
      <div class="flex flex-wrap gap-5">
        <div
          v-for="(repos, language) in reposStore.reposByLanguage"
          :key="language"
          class="h-72 w-60 overflow-y-auto border border-slate-400 rounded-lg p-5"
        >
          <div class="pb-5">{{ language }}</div>
          <div v-for="{ id, name } in repos" :key="id" class="pb-3">
            <div>{{ name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
