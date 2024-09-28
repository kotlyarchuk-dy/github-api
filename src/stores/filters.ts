import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Lang } from '@/types'

export const useFiltersStore = defineStore('filters', () => {
  const languages = ref<Lang[]>([])

  const addLanguage = (lang: Lang) => {
    languages.value.push(lang)
  }

  const removeLanguage = (lang: Lang) => {
    languages.value = languages.value.filter((l) => l !== lang)
  }

  return { languages, addLanguage, removeLanguage }
})
