<template>
  <div v-if="todos.length">
    <h1 class="container-inside mb-10 mt-9 text-center text-7xl text-slate-200">
      {{ title }}
    </h1>

    <TransitionGroup
      enterFromClass="opacity-0 translate-y-4"
      enterActiveClass="transition duration-1000"
      leaveFromClass="opacity-100 -translate-y-4"
      leaveActiveClass="transition duration-400"
    >
      <TodoListItem v-for="todo of todos" :key="todo.id" :todo="todo" />
    </TransitionGroup>
  </div>
</template>

<script setup>
import TodoListItem from '@/components/TodoListItem.vue'
defineProps({
  title: {
    type: String,
    default: '',
  },
  todos: {
    type: Object,
    required: true,
  },
})
</script>
