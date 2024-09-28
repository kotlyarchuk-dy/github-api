<script setup lang="ts">
import { useReposStore } from '@/stores/repos'
import LanguageBlock from './LanguageBlock.vue'

const reposStore = useReposStore()
</script>

<template>
  <div class="flex flex-wrap gap-5">
    <LanguageBlock v-for="language in reposStore.languages" :language="language" :key="language" />
  </div>
</template>

<style scoped></style>
