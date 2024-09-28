<script setup lang="ts">
defineProps<{ text: string }>()
const emit = defineEmits(['remove'])

const onCloseClick = () => emit('remove')
</script>

<template>
  <span
    class="inline-flex items-center gap-x-0.5 rounded-md bg-blue-100 mr-2 px-2 py-1 text-xs font-medium text-blue-700"
  >
    {{ text }}
    <button
      @click="onCloseClick"
      type="button"
      class="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-blue-600/20"
    >
      <span class="sr-only">Remove</span>
      <svg
        viewBox="0 0 14 14"
        class="h-3.5 w-3.5 stroke-blue-800/50 group-hover:stroke-blue-800/75"
      >
        <path d="M4 4l6 6m0-6l-6 6" />
      </svg>
      <span class="absolute -inset-1" />
    </button>
  </span>
</template>
