<script setup lang="ts">
import { computed } from 'vue'
import { useReposStore } from '@/stores/repos'
import { useAppStore } from '@/stores/app'
import LanguageBlock from './LanguageBlock.vue'
import LoadingState from './LoadingState.vue'
import EmptyState from './EmptyState.vue'

const reposStore = useReposStore()
const appStore = useAppStore()

const isEmpty = computed(() => reposStore.languages.length === 0)
</script>

<template>
  <LoadingState v-if="appStore.isLoading" />
  <EmptyState v-if="isEmpty" />
  <div v-else class="flex flex-wrap gap-5 p-5">
    <LanguageBlock v-for="language in reposStore.languages" :language="language" :key="language" />
  </div>
</template>

<style scoped></style>
