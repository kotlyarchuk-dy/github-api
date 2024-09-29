<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters'
import { langs } from '@/assets/data/langs'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import type { Lang } from '@/types'

const filtersStore = useFiltersStore()

const onLanguageSelect = (language: Lang) => {
  if (filtersStore.languages.includes(language)) {
    return
  }

  filtersStore.addLanguage(language)
}

const onLanguageRemove = (language: Lang) => {
  filtersStore.removeLanguage(language)
}
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-3">
    <BaseBadge
      v-for="language in filtersStore.languages"
      :key="language"
      :text="language"
      @remove="onLanguageRemove(language)"
    />
  </div>
  <BaseSelect :options="langs" @select="onLanguageSelect" />
</template>

<style scoped></style>
