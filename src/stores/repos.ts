import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ReposByLanguage, Lang, Repo } from '@/types'

export const useReposStore = defineStore('repos', () => {
  const collection = ref<ReposByLanguage>({})
  const languages = computed<Lang[]>(() => Object.keys(collection.value) as Lang[])
  const reposByLanguage = computed(() => (lang: Lang) => collection.value[lang])

  const setRepos = (repos: ReposByLanguage) => {
    collection.value = repos
  }

  const addRepos = (language: Lang, repos: Repo[]) => {
    if (!collection.value[language]) {
      collection.value[language] = []
    }
    collection.value[language].push(...repos)
  }

  return { collection, reposByLanguage, languages, setRepos, addRepos }
})
