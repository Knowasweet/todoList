<template>
  <div v-if="todos.length">
    <h2 class="mb-[39px] text-center text-7xl text-slate-200">Done</h2>
    <div class="done-todos space-y-[34px]">
      <TodoItem v-for="todo of todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script setup>
import TodoItem from '@/components/TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true,
  },
})
</script>
