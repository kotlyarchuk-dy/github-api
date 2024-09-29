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

  const fromDate = ref<string | null>(null)
  const toDate = ref<string | null>(null)

  const setFromDate = (date: string) => {
    fromDate.value = date
  }

  const setToDate = (date: string) => {
    toDate.value = date
  }

  const minStars = ref<number>(0)

  const setMinStars = (stars: number) => {
    minStars.value = stars
  }

  return {
    languages,
    addLanguage,
    removeLanguage,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    minStars,
    setMinStars
  }
})
