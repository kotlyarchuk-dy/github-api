<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits(['intersect'])

const scrollObserverRef = ref<HTMLElement | null>(null)
let scrollObserver = new IntersectionObserver(async ([entry]) => {
  if (entry.isIntersecting) {
    emit('intersect')
  }
})
onMounted(async () => {
  scrollObserver.observe(scrollObserverRef.value!)
})
onBeforeUnmount(() => {
  scrollObserver.disconnect()
})
</script>

<template>
  <div ref="scrollObserverRef" class="h-[1px] bg-transparent"></div>
</template>

<style scoped></style>
