<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters'
import { useAppStore } from '@/stores/app'
import { GithubService } from '@/services/github'
import BaseButton from '@/components/base/BaseButton.vue'
import LanguageSelector from './LanguageSelector.vue'
import DateRange from './DateRange.vue'
import StarsInput from './StarsInput.vue'

const filtersStore = useFiltersStore()
const appStore = useAppStore()

const onSearchClick = async () => {
  appStore.setLoading(true)
  await GithubService.fetchReposByFilter({
    languages: filtersStore.languages,
    fromDate: filtersStore.fromDate,
    toDate: filtersStore.toDate,
    minStars: filtersStore.minStars
  })
  appStore.setLoading(false)
}
</script>

<template>
  <div class="mb-5">Filters</div>
  <div class="mb-5">
    <LanguageSelector />
  </div>
  <div class="mb-5">
    <DateRange />
  </div>
  <div class="mb-5">
    <StarsInput />
  </div>
  <BaseButton text="Search" @click="onSearchClick" />
</template>

<style scoped></style>
