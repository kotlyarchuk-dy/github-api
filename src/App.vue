<script setup lang="ts">
import FiltersPanel from '@/components/FiltersPanel.vue'
import LanguageReposList from './components/LanguageReposList.vue'
</script>

<template>
  <div class="w-full h-full flex content-stretch">
    <div class="left w-80 p-5 flex-shrink-0 bg-slate-100">
      <FiltersPanel />
    </div>
    <div class="flex-grow overflow-auto bg-slate-200">
      <LanguageReposList />
    </div>
  </div>
</template>

<style scoped></style>
