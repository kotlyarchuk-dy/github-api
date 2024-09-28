<script setup lang="ts">
import { ref } from 'vue'
import { GithubService } from '@/services/github'
import type { Repo } from '@/types'

const repos = ref<Repo[]>([])

const onSearchClick = async () => {
  const reposFound = await GithubService.getRepos()
  repos.value = reposFound
}
</script>

<template>
  <div class="w-full h-full flex content-stretch">
    <div class="left w-80 flex-shrink-0 bg-slate-100">
      <div>Filters</div>
      <button @click="onSearchClick">Search</button>
    </div>
    <div class="content flex-grow overflow-auto">
      <div>Content</div>
      <div v-for="repo in repos" :key="repo.id">
        <div>Name - {{ repo.name }}</div>
        <div>Description - {{ repo.description }}</div>
        <div>Stars - {{ repo.starsCount }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
