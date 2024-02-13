<template>
  <div class="flex flex-row-reverse justify-end gap-[18px]">
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
        class="flex h-[35px] cursor-pointer select-none items-center justify-center rounded-[4px] border-[1px] border-gray-100 px-[13px] py-[8px] text-base text-gray-400 transition duration-300 hover:opacity-50"
        :class="modelValue === priority.name ? priority.selected : priority.base"
      >
        {{ priority.name }}
      </label>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line vue/require-prop-types
const modelValue = defineModel({ required: true })

const priorities = [
  {
    id: 1,
    name: 'High',
    base: 'hover:text-rose-600 hover:bg-red-100 hover:border-red-100',
    selected: 'text-rose-600 bg-red-100 border-red-100',
  },
  {
    id: 2,
    name: 'Medium',
    base: 'hover:text-orange-600 hover:bg-orange-100 hover:border-orange-100',
    selected: 'text-orange-600 bg-orange-100 border-orange-100',
  },
  {
    id: 3,
    name: 'Low',
    base: 'hover:text-blue-600 hover:bg-blue-100 hover:border-blue-100',
    selected: 'text-blue-600 bg-blue-100 border-blue-100',
  },
]
</script>
