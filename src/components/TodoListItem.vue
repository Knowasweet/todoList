<template>
  <div class="group mb-9 flex items-center justify-between group-hover:mb-7">
    <div class="hidden group-hover:block">
      <button @click="removeTodo(todo.id)">
        <FontAwesomeIcon
          :icon="['far', 'trash-can']"
          size="7x"
          class="w-[116px] text-gray-100 transition duration-1000 hover:text-rose-600"
        />
      </button>
    </div>

    <div
      class="container-inside rounded-[8px] border-x-2 border-transparent bg-white px-9 py-7 shadow-sm transition-all duration-200 group-hover:w-[489px] group-hover:px-14 group-hover:py-8"
      :class="{
        'border-r-green-600': todo.completed,
      }"
    >
      <h2
        class="mb-3 line-clamp-2 text-2xl text-gray-700"
        :class="{ 'line-through': todo.completed }"
      >
        {{ todo.title }}
      </h2>
      <div class="mb-3 line-clamp-5 text-base text-gray-500">{{ todo.text }}</div>
      <div class="flex flex-wrap gap-[12px]">
        <div
          class="h-[25px] w-[30px] rounded-[10px] bg-red-50 px-2 py-[5px] text-center text-xs text-rose-600"
        >
          P{{ todo.priority }}
        </div>
        <div
          v-for="(tag, index) of todo.tags"
          :key="index"
          class="h-[25px] min-w-[30px] truncate rounded-[10px] bg-green-50 px-2 py-[5px] text-center text-xs font-bold text-green-600"
        >
          {{ tag }}
        </div>
      </div>
    </div>

    <div class="hidden group-hover:block">
      <button type="button" @click="completeTodo(todo.id)">
        <FontAwesomeIcon
          :icon="['fas', 'check-circle']"
          size="6x"
          class="w-[100px] rounded-full p-2 transition duration-1000"
          :class="isCompletedButton"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/TodoStore.js'
import { computed } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const todoStore = useTodoStore()
const removeTodo = (id) => {
  todoStore.removeTodo(id)
}

const completeTodo = (id) => {
  todoStore.updateTodoCompleted(id)
}

const isCompletedButton = computed(() => {
  if (props.todo.completed) {
    return 'text-green-600 bg-white hover:bg-slate-100 hover:text-white'
  }
  return 'text-white bg-slate-100 hover:bg-white hover:text-green-600'
})
</script>
