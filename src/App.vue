<script setup lang="ts">
import FiltersPanel from '@/components/FiltersPanel.vue'
import LanguageList from './components/LanguageList.vue'
</script>

<template>
  <div class="w-full h-full flex content-stretch">
    <FiltersPanel />
    <div class="flex-grow overflow-auto">
      <LanguageList />
    </div>
  </div>
</template>

<style scoped></style>
