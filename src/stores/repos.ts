import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ReposByLanguage, Lang } from '@/types'

export const useReposStore = defineStore('repos', () => {
  const collection = ref<ReposByLanguage>({})
  const languages = computed<Lang[]>(() => Object.keys(collection.value) as Lang[])
  const reposByLanguage = computed(() => (lang: Lang) => collection.value[lang])

  const setRepos = (repos: ReposByLanguage) => {
    collection.value = repos
  }

  return { collection, reposByLanguage, languages, setRepos }
})
