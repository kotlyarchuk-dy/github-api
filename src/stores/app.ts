import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setLoading = (flag: boolean) => {
    isLoading.value = flag
  }

  const setError = (err: string | null) => {
    error.value = err
  }

  return { isLoading, setLoading, error, setError }
})
