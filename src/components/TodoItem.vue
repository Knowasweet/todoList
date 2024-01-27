<template>
  <div class="group flex items-center justify-between">
    <div class="hidden group-hover:block">
      <button @click="removeTodo(todo.id)">
        <FontAwesomeIcon
          :icon="['far', 'trash-can']"
          size="6x"
          class="text-gray-100 transition-colors duration-300 hover:text-rose-600"
        />
      </button>
    </div>

    <div
      class="mx-[40px] w-full space-y-[12px] rounded-[8px] border-x-[1px] bg-white px-[33px] py-[26px] shadow-sm transition-all duration-300 group-hover:mx-[10px] group-hover:px-[55px]"
      :class="[
        todo.completed ? 'border-l-transparent border-r-green-600' : 'border-transparent',
        `todo-${todo.id}`,
      ]"
    >
      <h3 class="line-clamp-2 text-2xl text-gray-700" :class="{ 'line-through': todo.completed }">
        {{ todo.title }}
      </h3>

      <div class="line-clamp-5 text-base text-gray-500" v-if="todo.text">
        {{ todo.text }}
      </div>

      <div class="flex flex-wrap gap-[12px]">
        <div
          class="h-[25px] rounded-[10px] px-[8px] py-[5px] text-center text-xs"
          :class="priorityColor"
        >
          {{ todo.priorityValue }}
        </div>
        <div
          v-for="(tag, index) of todo.tags"
          :key="index"
          class="h-[25px] truncate rounded-[10px] bg-green-50 px-[8px] py-[5px] text-center text-xs font-bold text-green-600"
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
          class="rounded-full transition-colors duration-300"
          :class="isCompleted"
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
  },
})

const todoStore = useTodoStore()
const removeTodo = (id) => {
  todoStore.removeTodo(id)
}

const completeTodo = (id) => {
  todoStore.updateTodoCompleted(id)
}

const isCompleted = computed(() => {
  if (props.todo.completed) {
    return 'text-green-600 bg-transparent hover:bg-slate-100 hover:text-transparent'
  }
  return 'text-gray-100 hover:bg-transparent hover:text-green-600'
})

const priorityColor = computed(() => {
  switch (props.todo.priorityValue) {
    case 'High':
      return 'text-rose-600 bg-red-100'
    case 'Medium':
      return 'text-orange-600 bg-orange-100'
    case 'Low':
      return 'text-blue-600 bg-blue-100'
  }
})
</script>
