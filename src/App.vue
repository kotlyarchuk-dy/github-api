<script setup lang="ts">
import FiltersPanel from '@/components/filters-panel/FiltersPanel.vue'
import SearchResult from '@/components/search-result/SearchResult.vue'
import NotificationPanel from '@/components/NotificationPanel.vue'
</script>

<template>
  <div class="w-full h-full flex content-stretch">
    <div class="left w-80 p-5 flex-shrink-0 bg-slate-100">
      <FiltersPanel />
    </div>
    <div class="flex-grow overflow-auto bg-slate-200">
      <SearchResult />
    </div>
    <NotificationPanel />
  </div>
</template>

<style scoped></style>
