<script setup lang="ts">
import { GithubService } from '@/services/github'
import BaseButton from './BaseButton.vue'

const onSearchClick = async () => {
  await GithubService.searchByLanguageList(['C', 'JavaScript', 'Python', 'Kotlin', 'PHP'])
}
</script>

<template>
  <div class="left w-80 flex-shrink-0 bg-slate-100">
    <div>Filters</div>
    <BaseButton text="Search" @click="onSearchClick" />
  </div>
</template>

<style scoped></style>
