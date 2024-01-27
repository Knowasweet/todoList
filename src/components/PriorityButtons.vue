<template>
  <div class="flex gap-[18px]">
    <div v-for="priority of priorities" :key="priority.id">
      <input
        type="radio"
        v-model="modelValue"
        :value="priority.name"
        :id="priority.id"
        class="hidden"
      />
      <label
        :for="priority.id"
        class="flex h-[35px] cursor-pointer select-none items-center justify-center rounded-md border-[1px] border-gray-100 px-[13px] py-[8px] text-base text-gray-400 transition duration-300 hover:opacity-50"
        :class="modelValue === priority.name ? priority.active : priority.hover"
      >
        {{ priority.name }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line vue/require-prop-types
const modelValue = defineModel({ required: true })

const priorities = ref([
  {
    id: 1,
    name: 'High',
    hover: 'hover:text-rose-600 hover:bg-red-100 hover:border-red-100',
    active: 'text-rose-600 bg-red-100 border-red-100',
  },
  {
    id: 2,
    name: 'Medium',
    hover: 'hover:text-orange-600 hover:bg-orange-100 hover:border-orange-100',
    active: 'text-orange-600 bg-orange-100 border-orange-100',
  },
  {
    id: 3,
    name: 'Low',
    hover: 'hover:text-blue-600 hover:bg-blue-100 hover:border-blue-100',
    active: 'text-blue-600 bg-blue-100 border-blue-100',
  },
])
</script>
