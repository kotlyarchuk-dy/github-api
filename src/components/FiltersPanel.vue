<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters'
import { GithubService } from '@/services/github'
import { langs } from '@/assets/data/langs'
import BaseSelect from './BaseSelect.vue'
import BaseButton from './BaseButton.vue'
import BaseBadge from './BaseBadge.vue'
import type { Lang } from '@/types'

const filtersStore = useFiltersStore()

const onLanguageSelect = (language: Lang) => {
  filtersStore.addLanguage(language)
}

const onLanguageRemove = (language: Lang) => {
  filtersStore.removeLanguage(language)
}

const onSearchClick = async () => {
  await GithubService.searchByLanguageList(filtersStore.languages)
}
</script>

<template>
  <div class="left w-80 p-5 flex-shrink-0 bg-slate-100">
    <div class="mb-5">Filters</div>
    <div class="mb-3">
      <BaseBadge
        v-for="language in filtersStore.languages"
        :key="language"
        :text="language"
        @remove="onLanguageRemove(language)"
      />
    </div>
    <div class="mb-3">
      <BaseSelect :options="langs" @select="onLanguageSelect" />
    </div>
    <BaseButton text="Search" @click="onSearchClick" />
  </div>
</template>

<style scoped></style>
