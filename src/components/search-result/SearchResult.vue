<script setup lang="ts">
import { computed } from 'vue'
import { useReposStore } from '@/stores/repos'
import { useAppStore } from '@/stores/app'
import LanguageBlock from './LanguageBlock.vue'
import LoadingState from './LoadingState.vue'
import EmptyState from './EmptyState.vue'
import SearchSummary from './SearchSummary.vue'

const reposStore = useReposStore()
const appStore = useAppStore()

const isEmpty = computed(() => reposStore.languages.length === 0)
</script>

<template>
  <Transition name="fade" mode="out-in">
    <LoadingState v-if="appStore.isLoading" />
    <EmptyState v-else-if="isEmpty" />
    <div v-else class="p-5">
      <SearchSummary class="mb-5" />
      <div class="flex flex-wrap gap-5">
        <LanguageBlock
          v-for="language in reposStore.languages"
          :language="language"
          :key="language"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
