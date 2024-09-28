import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ReposByLanguage } from '@/types'

export const useReposStore = defineStore('repos', () => {
  const reposByLanguage = ref<ReposByLanguage>({})

  const setRepos = (repos: ReposByLanguage) => {
    reposByLanguage.value = repos
  }

  return { reposByLanguage, setRepos }
})
