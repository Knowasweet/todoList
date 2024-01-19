<template>
  <input
    type="radio"
    v-model="props.modelValue"
    :value="priorityValue"
    :id="priorityValue"
    class="hidden"
    @input="emit('update:modelValue', $event.target.value)"
  />
  <label
    :for="priorityValue"
    class="bg-gray-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border-2 border-gray-100 px-4 py-2 text-base text-gray-400 transition duration-1000 hover:bg-slate-200 hover:text-white"
    :class="activeButton"
  >
    {{ priorityValue }}
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  priorityValue: {
    type: Number,
    required: true,
  },
  bgColor: {
    type: String,
  },
  modelValue: {
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const activeButton = computed(() => {
  return { [props.bgColor]: props.modelValue == props.priorityValue }
})
</script>
