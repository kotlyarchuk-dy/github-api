<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/vue'

const { options } = defineProps<{ options: readonly string[] }>()
const emit = defineEmits(['select'])

const query = ref('')
const selectedOption = ref(null)
const filteredOptions = computed(() =>
  query.value === ''
    ? options
    : options.filter((option) => {
        return option.toLowerCase().includes(query.value.toLowerCase())
      })
)

const onOptionSelect = (option: string) => {
  console.error('option', option)

  selectedOption.value = null
  query.value = ''
  emit('select', option)
}
</script>

<template>
  <Combobox as="div" v-model="selectedOption" @update:modelValue="onOptionSelect">
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @change="query = $event.target.value"
        @blur="query = ''"
        :display-value="() => ''"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredOptions.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="language in filteredOptions"
          :key="language"
          :value="language"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-indigo-600 text-white' : 'text-gray-900'
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ language }}
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
