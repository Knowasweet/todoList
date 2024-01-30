<template>
  <div class="mb-[21px]">
    <h1 class="text-center text-7xl text-slate-200">Daily Todo</h1>
    <div v-if="todos.length" class="mt-[39px]">
      <div class="open-todos space-y-[34px]">
        <TodoItem v-for="todo of todos" :key="todo.id" :todo="todo" />
      </div>
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
