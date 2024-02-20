<template>
  <div class="group flex justify-center">
    <div class="flex w-[1290px] items-center justify-between">
      <div class="mx-auto hidden group-hover:block">
        <button @click="removeTodo(todo.id)">
          <FontAwesomeIcon
            :icon="['far', 'trash-can']"
            size="6x"
            class="w-[100px] text-gray-100 transition-colors duration-300 hover:text-red-600 active:text-red-800"
          />
        </button>
      </div>

      <div
        class="mx-auto rounded-[8px] border-x-[1px] bg-white px-[33px] py-[26px] shadow-sm transition-[padding] duration-300 group-hover:mx-[10px] group-hover:px-[55px]"
        :class="[
          todo.completed ? 'border-l-transparent border-r-green-600' : 'border-transparent',
          `todo-${todo.id}`,
        ]"
      >
        <div class="w-[445px] space-y-[12px] group-hover:min-w-[445px]">
          <h3
            class="line-clamp-2 text-2xl text-gray-700"
            :class="{ 'line-through': todo.completed }"
          >
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
              {{ todo.priority }}
            </div>
            <div
              v-for="(tag, index) of todo.tags"
              :key="index"
              class="h-[25px] truncate rounded-[10px] px-[8px] py-[5px] text-center text-xs font-bold"
              :style="{
                backgroundColor: colorConvertHexToRgba(tag.selectedColor, 0.2),
                color: tag.selectedColor,
              }"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto hidden group-hover:block">
        <button type="button" @click="completeTodo(todo.id)">
          <FontAwesomeIcon
            :icon="['fas', 'check-circle']"
            size="6x"
            class="w-[100px] rounded-full transition-colors duration-300"
            :class="isCompleted"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodosStore } from '@/stores/todos.js'
import { computed } from 'vue'
import { colorConvertHexToRgba } from '@/helpers/colorHelpers.js'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const todosStore = useTodosStore()
const removeTodo = (id) => {
  todosStore.removeTodo(id)
}

const completeTodo = (id) => {
  todosStore.updateTodoCompleted(id)
}

const isCompleted = computed(() => {
  if (props.todo.completed) {
    return 'text-green-600 bg-transparent hover:bg-slate-100 active:text-green-900 hover:text-green-800'
  }
  return 'text-gray-100 hover:bg-transparent hover:text-green-600 active:text-green-800'
})

const priorityColor = computed(() => {
  switch (props.todo.priority) {
    case 'High':
      return 'text-rose-600 bg-red-100'
    case 'Medium':
      return 'text-orange-600 bg-orange-100'
    case 'Low':
      return 'text-blue-600 bg-blue-100'
    default:
      return ''
  }
})
</script>
